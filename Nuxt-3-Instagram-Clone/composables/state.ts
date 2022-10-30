export const useFirebaseUser = () => useState<any>("currentUser", () => {});
export const useLoadingState = () => useState<boolean>("loading", () => true);