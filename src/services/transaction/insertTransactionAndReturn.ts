import { Request } from "express";
import { getToken } from "../../utils";
import { createNewTransaction } from "../../repositories";
import { TransactionParams } from "../../models";
import { verifyCategorieId } from "../../providers";

const insertTransactionAndReturn = async (params: TransactionParams, req: Request) => {
  await verifyCategorieId(params.categorie_id);

  const userId = getToken(req);

  const newTransaction = await createNewTransaction(params, userId);

  return newTransaction;
};

export default insertTransactionAndReturn;
