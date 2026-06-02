import DeleteAccountForm from "@/components/settings/DeleteAccountForm";
import UpdateProfileForm from "@/components/settings/UpdateProfileForm";

const Settings = () => {
  return (
    <>
      <UpdateProfileForm className="w-full max-w-sm" />
      <DeleteAccountForm className="w-full max-w-sm" />
    </>
  );
};

export default Settings;
