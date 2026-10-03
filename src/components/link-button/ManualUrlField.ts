import { createElement, useCallback, useSyncExternalStore } from "react";
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
    > & { placeholder?: string };
  };

export function ManualUrlField(props: Props) {
  const { form, tinaForm, input } = props;
  if (!form || !tinaForm) {
    throw new Error("ManualUrlField must be rendered inside a Tina form.");
  }
  // Use the full field path so nested buttons and list items stay independent.
  const pageFieldName = input.name.replace(/url$/, "page");
  const subscribe = useCallback(
    (onChange: () => void) =>
      form.registerField(pageFieldName, onChange, { value: true }),
    [form, pageFieldName],
  );
  const getSnapshot = useCallback(
    () => Boolean(form.getFieldState(pageFieldName)?.value),
    [form, pageFieldName],
  );
  const hasPage = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return createElement(TextField, {
    ...props,
    form,
    tinaForm,
    field: {
      ...props.field,
      component: "text",
      placeholder: props.field.placeholder ?? "",
      disabled: hasPage || props.field.disabled,
    },
  });
}
