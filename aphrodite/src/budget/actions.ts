import { ActionBase } from "../types/global";
import { Budget } from "./types";
import { BaseResponse } from "../helpers/api";

export const enum BudgetActions {
  GetBudget = "Budget.GetBudget",
  GetBudgetResponse = "Budget.GetBudgetResponse",
  SetBudget = "Budget.SetBudget",
  SetBudgetResponse = "Budget.SetBudgetResponse",
  AmendBudget = "Budget.AmendBudget",
  AmendBudgetResponse = "Budget.AmendBudgetResponse"
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

export class AmendBudget implements ActionBase {
  public readonly type = BudgetActions.AmendBudget;
  constructor(public id: string, public amount: number) {}
}

export class AmendBudgetResponse implements ActionBase {
  public readonly type = BudgetActions.AmendBudgetResponse;
  constructor(public response: BaseResponse<Budget>) {}
}

export type BudgetActionTypes =
  | SetBudget
  | SetBudgetResponse
  | GetBudget
  | GetBudgetResponse
  | AmendBudget
  | AmendBudgetResponse;
