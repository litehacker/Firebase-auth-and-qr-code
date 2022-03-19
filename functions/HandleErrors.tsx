export const HandleError = (error: any): string => {
  console.log(error);
  switch (error.code) {
    case "auth/wrong-password":
      return "არასწორი პაროლი";
    case "auth/invalid-email":
      return "ელ-ფოსტა არ არის მართებული";
    case "auth/email-already-in-use":
      return "ანგარიში უკვე არსებობს";
    case "auth/weak-password":
      return "პაროლი უნდა შედგებოდეს 6 ან მეტი სიმბოლოსგან";
    case "auth/app-deleted":
      return "instance of FirebaseApp has been deleted";
    case "auth/app-not-authorized":
      return "Review your key configuration in the Google API";
    case "auth/invalid-api-key":
      return "API key is invalid";
    case "auth/invalid-user-token":
      return "credential is no longer valid. The user must sign in again.";
    case "auth/invalid-tenant-id":
      return "tenant ID provided is invalid.";
    case "auth/network-request-failed":
      return "ინტერნეტის პრობლემაა";
    case "auth/operation-not-allowed":
      return "ოპერაცია არ არის ნებადართული";
    case "auth/requires-recent-login":
      return "user's last sign-in time does not meet the security threshold";
    case "auth/too-many-requests":
      return "ძალიან ბევრი ცდა";
    case "auth/unauthorized-domain":
      return "არა ავტორიზებული დომენი";
    case "auth/user-disabled":
      return "მომხმარებელი გამორთულია";
    case "auth/user-token-expired":
      return "Credential has expired";
    case "auth/web-storage-unsupported":
      return "Unsupported browser storage";
    default:
      return error.message;
  }
};
