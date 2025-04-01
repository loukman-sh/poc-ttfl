import { Container } from "inversify";
import { injectAuthFeature } from "@/features/auth/common/auth-injection";
import SupabaseServiceImpl from "@/core/services/supabase-service";
import { SupabaseService } from "@/core/services/supabase-service";
import {
  SecureStorageService,
  SecureStorageServiceImpl,
} from "@/core/services/secure-storage-service";
import {
  LocalStorageService,
  LocalStorageServiceImpl,
} from "@/core/services/local-storage-service";
import { injectGamesFeature } from "@/features/games/common/games-injection";
import { injectSignupFeature } from "@/features/signup/common/signup-injection";
import { injectDecksFeature } from "@/features/decks/common/decks-injection";

export const container = new Container({ defaultScope: "Singleton" });

// Core dependencies
container.bind(SecureStorageService).to(SecureStorageServiceImpl);
container.bind(LocalStorageService).to(LocalStorageServiceImpl);
container.bind(SupabaseService).to(SupabaseServiceImpl);

// Features dependencies
injectAuthFeature(container);
injectGamesFeature(container);
injectSignupFeature(container);
injectDecksFeature(container);

export default container;
