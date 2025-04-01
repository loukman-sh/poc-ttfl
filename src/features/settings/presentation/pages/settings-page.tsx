import { AppGap } from "@/core/design/components/atoms/app-gap";
import { AppPage } from "@/core/design/components/atoms/app-page";
import { AppText } from "@/core/design/components/atoms/app-text";
import { AppButton } from "@/core/design/components/molecules/app-button";
import { useSession } from "@/features/auth/presentation/hooks/use-session";
import { useAppColorScheme } from "@/core/design/hooks/use-app-color-scheme";
import { useQueryClient } from "@tanstack/react-query";
export default function SettingsPage() {
  const { logout, user } = useSession();
  const { toggleColorScheme } = useAppColorScheme();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(() => queryClient.clear());
  };

  return (
    <AppPage center>
      <AppText>Paramètres</AppText>
      <AppGap />
      <AppText>Connecté en tant que : {user?.email}</AppText>
      <AppGap />
      <AppButton onPress={handleLogout}>Déconnexion</AppButton>
      <AppGap />
      <AppButton onPress={toggleColorScheme} variant="outline">
        Changer de thème
      </AppButton>
    </AppPage>
  );
}
