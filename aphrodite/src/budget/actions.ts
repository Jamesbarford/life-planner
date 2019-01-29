import { ActionBase } from "../types/global";
import { Budget } from "./types";
import { BaseResponse } from "../helpers/api";

export const enum BudgetActions {
  GetBudget = "Budget.GetBudget",
  GetBudgetResponse = "Budget.GetBudgetResponse",
  SetBudget = "Budget.SetBudget",
  SetBudgetResponse = "Budget.SetBudgetResponse"
}

export class SetBudget implements ActionBase {
  public readonly type = BudgetActions.SetBudget;
  constructor(public budget: Budget) {}
}

export class SetBudgetResponse implements ActionBase {
  public readonly type = BudgetActions.SetBudgetResponse;
  constructor(public response: BaseResponse<Budget>) {}
}

export class GetBudget implements ActionBase {
  public readonly type = BudgetActions.GetBudget;
  constructor(public month: number) {}
}

export class GetBudgetResponse implements ActionBase {
  public readonly type = BudgetActions.GetBudgetResponse;
  constructor(public response: BaseResponse<Budget>) {}
}

export type BudgetActionTypes =
  | SetBudget
  | SetBudgetResponse
  | GetBudget
  | GetBudgetResponse;
