import {
  AppButton,
  AppGap,
  AppPage,
  AppText,
  useColorSchemeStore,
} from "@/core/design";
import { useSession } from "@/features/auth/presentation/hooks/use-session";

export default function SettingsPage() {
  const { logout, user } = useSession();
  const { toggleColorScheme } = useColorSchemeStore();
  return (
    <AppPage center>
      <AppText>Settings</AppText>
      <AppGap />
      <AppText>Connected as {user?.email}</AppText>
      <AppGap />
      <AppButton onPress={logout}>Logout</AppButton>
      <AppGap />
      <AppButton onPress={toggleColorScheme}>Toggle Theme</AppButton>
    </AppPage>
  );
}
