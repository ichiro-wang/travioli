import FullPage from "@/components/FullPage";
import DeleteAccountForm from "@/components/settings/DeleteAccountForm";
import UpdateProfileForm from "@/components/settings/UpdateProfileForm";

const Settings = () => {
  return (
    <FullPage className="flex flex-col gap-5 h-full">
      <UpdateProfileForm className="w-full max-w-sm" />
      <DeleteAccountForm className="w-full max-w-sm" />
    </FullPage>
  );
};

export default Settings;
