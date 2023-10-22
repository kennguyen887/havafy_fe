import * as React from 'react';

type UserFormValue = string | null;
type updateFormFn = (text: string) => Promise<boolean>; // Return success

export default function useUserForm(): [updateFormFn, UserFormValue] {
  const [userForm, setUserForm] = React.useState<UserFormValue>(null);

  const form: updateFormFn = async (text) => {
      setUserForm(text);
      return true;
  };

  return [form, userForm];
}
