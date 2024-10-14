interface ApiResponse<T> {
  data: T;
  errors: any;
  message: string;
  request_id: string;
  status_code: number;
  status_desc: string;
}

export const fetch = (url: any, method: any, ...param: any) => {
  return new Promise<ApiResponse<any>>((resolve, reject) => {
    method(url, ...param)
      .then((res: any) => resolve(res.data))
      .catch((err: any) => {
        const defaultError = {
          code: 500,
          status: "error",
          message: "Mohon tunggu beberapa saat dan refresh halaman.",
        };

        if (!err.response) {
          console.error(err, "\n", "fetch", url, "\n", param);
          return reject(defaultError);
        }
        if (!err.response.data) {
          console.error(err, "\n", "fetch", url, "\n", param);
          return reject(defaultError);
        }
        // if (err.response.status === 401) {
        //   IS_UNAUTHORIZED_401.value = true;
        // }
        reject(err.response.data);
      });
  });
};
