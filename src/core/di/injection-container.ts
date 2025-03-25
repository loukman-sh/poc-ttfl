import { Container } from "inversify";
import { injectAuth } from "@/features/auth/common/auth-injection";
import SupabaseServiceImpl from "../services/supabase-service";
import { SupabaseService } from "../services/supabase-service";
import {
  SecureStorageService,
  SecureStorageServiceImpl,
} from "../services/secure-storage-service";
import {
  LocalStorageService,
  LocalStorageServiceImpl,
} from "../services/local-storage-service";

export const container = new Container({ defaultScope: "Singleton" });

// Core dependencies
container.bind(SecureStorageService).to(SecureStorageServiceImpl);
container.bind(LocalStorageService).to(LocalStorageServiceImpl);
container.bind(SupabaseService).to(SupabaseServiceImpl);

// Features dependencies
injectAuth(container);

// Services initialization
container.get(SupabaseService).init();

export default container;
