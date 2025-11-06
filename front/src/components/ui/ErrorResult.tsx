import { Result } from "antd";
import { AxiosError } from "axios";
import React from "react";
import type { ResultStatusType } from 'antd/es/result';

export type ApiError = Error | AxiosError<{ message?: string }>;

interface ErrorResultProps {
  error: ApiError;
  isError?: boolean;
  status?: ResultStatusType;
  title?: string;
}

export const ErrorResult: React.FC<ErrorResultProps> = ({
  error,
  isError = true,
  title = "Ha ocurrido un error",
}) => {
  if (!isError) return null;

  // Determinar el mensaje de error seguro
  let errorMessage = "Error desconocido";

  if (error instanceof AxiosError) {
    const msg = error.response?.data?.message;
    if (typeof msg === "string") errorMessage = msg;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return <Result status="500" title={title} subTitle={errorMessage} />;
};
