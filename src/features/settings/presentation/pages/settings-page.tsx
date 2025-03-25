
import { AppGap } from "@/core/design/components/atoms/app-gap";
import { AppPage } from "@/core/design/components/atoms/app-page";
import { AppText } from "@/core/design/components/atoms/app-text";
import { AppButton } from "@/core/design/components/molecules/app-button";
import { useSession } from "@/features/auth/presentation/hooks/use-session";
import { useAppColorScheme } from "@/core/design/hooks/use-app-color-scheme";
export default function SettingsPage() {
  const { logout, user } = useSession();
  const { toggleColorScheme } = useAppColorScheme();
  return (
    <AppPage center>
      <AppText>Settings</AppText>
      <AppGap />
      <AppText>Connected as {user?.email}</AppText>
      <AppGap />
      <AppButton onPress={logout}>Logout</AppButton>
      <AppGap />
      <AppButton onPress={toggleColorScheme} variant="outline">
        Toggle Theme
      </AppButton>
    </AppPage>
  );
}
