import { createElement, useCallback, useEffect, useSyncExternalStore } from "react";
import type { ComponentProps } from "react";
import { TextField } from "tinacms";

type TextFieldProps = ComponentProps<typeof TextField>;
type Props = Pick<TextFieldProps, "meta"> &
  Partial<Pick<TextFieldProps, "form" | "tinaForm">> & {
    input: Pick<TextFieldProps["input"], "name" | "value" | "onChange" | "type"> & {
      onBlur: () => void;
      onFocus: () => void;
    };
    field: Pick<
      TextFieldProps["field"],
      "name" | "label" | "description" | "disabled" | "experimental_focusIntent"
    >;
  };

type Row = { amount?: number | null; unitPrice?: number | null } | null;

// Read-only "End" field: always the sum of the section's project cost rows.
export function ProgressBarEndField(props: Props) {
  const { form, tinaForm, input } = props;
  if (!form || !tinaForm) {
    throw new Error("ProgressBarEndField must be rendered inside a Tina form.");
  }
  // `sections.N.explainer.progressBar.end` → `sections.N.costs.rows`
  const rowsFieldName = input.name.replace(/explainer\.progressBar\.end$/, "costs.rows");
  const subscribe = useCallback(
    (onChange: () => void) =>
      form.registerField(rowsFieldName, onChange, { value: true }),
    [form, rowsFieldName],
  );
  const getSnapshot = useCallback(
    () =>
      ((form.getFieldState(rowsFieldName)?.value ?? []) as Row[]).reduce(
        (total, row) => total + (row?.amount ?? 0) * (row?.unitPrice ?? 0),
        0,
      ),
    [form, rowsFieldName],
  );
  const totalPrice = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  // Keep the stored value in sync so the content file matches what's rendered.
  useEffect(() => {
    if (input.value !== totalPrice) input.onChange(totalPrice);
  }, [input, totalPrice]);

  return createElement(TextField, {
    ...props,
    form,
    tinaForm,
    input: { ...input, value: totalPrice },
    field: {
      ...props.field,
      component: "text",
      disabled: true,
    },
  });
}
