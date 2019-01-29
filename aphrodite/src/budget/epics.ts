import { combineEpics } from "redux-observable";
import "rxjs/add/operator/switchMap";
import { getRequest, Api, postRequest, patchRequest } from "../helpers/api";
import {
  SetBudget,
  SetBudgetResponse,
  BudgetActions,
  GetBudget,
  GetBudgetResponse,
  AmendBudgetResponse,
  AmendBudget
} from "./actions";
import { Budget } from "./types";
import { Epic } from "../App/middleware";

const setBudgetEpic: Epic<SetBudget, SetBudgetResponse> = action$ =>
  action$
    .ofType(BudgetActions.SetBudget)
    .switchMap(action =>
      postRequest<Budget, Budget>(`${Api}/budget`, action.budget).then(
        response => new SetBudgetResponse(response)
      )
    );

const amendBudgetEpic: Epic<AmendBudget, AmendBudgetResponse> = action$ =>
  action$.ofType(BudgetActions.AmendBudget).switchMap(action =>
    patchRequest<{ budget: number }, Budget>(`${Api}/budget/${action.id}`, {
      budget: action.amount
    }).then(response => new AmendBudgetResponse(response))
  );

const getBudgetForMonthEpic: Epic<GetBudget, GetBudgetResponse> = action$ =>
  action$
    .ofType(BudgetActions.GetBudget)
    .switchMap(action =>
      getRequest<Budget>(`${Api}/budget/${action.month}`).then(
        response => new GetBudgetResponse(response)
      )
    );

const epics = [setBudgetEpic, amendBudgetEpic, getBudgetForMonthEpic];

export const budgetEpics = combineEpics(...epics);
