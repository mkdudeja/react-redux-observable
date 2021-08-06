import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { appConstants, networkService } from "../shared";
import { AuthState } from "../shared/interfaces";
import { ILoginRequest } from "./login/login.iterface";

export function login(data: ILoginRequest): Observable<AuthState> {
  return networkService.post<AuthState>(appConstants.urls.login, data).pipe(
    map((response: AuthState) => {
      return response;
    })
  );
}
export function setCredentials(result: unknown): any {
  throw new Error("Function not implemented.");
}
