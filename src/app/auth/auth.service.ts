import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { appConstants, networkService } from "../shared";
import { ILoginRequest, ILoginResponse } from "./auth.interface";

export function login(data: ILoginRequest): Observable<ILoginResponse> {
  return networkService
    .post<ILoginResponse>(appConstants.urls.login, data)
    .pipe(
      map((response: ILoginResponse) => {
        return response;
      })
    );
}
