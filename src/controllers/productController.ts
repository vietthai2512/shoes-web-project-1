import { NextFunction, Request, Response } from "express";

export const productList = function (req: Request, res: Response, next: NextFunction)
{
    res.send('TODO: List all products');
};

export const productDetail = function (req: Request, res: Response, next: NextFunction)
{
    res.send('TODO: Product detail');
};

/*export const productSearch = function (req: Request, res: Response, next: NextFunction)
{
    res.send('TODO: Search product');
}*/

export const productCreateGET = function (req: Request, res: Response, next: NextFunction)
{
    res.send('TODO: Create a product GET');
};

export const productCreatePOST = function (req: Request, res: Response, next: NextFunction)
{
    res.send('TODO: Create a product POST');
};

export const productUpdateGET = function (req: Request, res: Response, next: NextFunction)
{
    res.send('TODO: Update a product GET');
};

export const productUpdatePOST = function (req: Request, res: Response, next: NextFunction)
{
    res.send('TODO: Update a product POST');
};

export const productDeleteGET = function (req: Request, res: Response, next: NextFunction)
{
    res.send('TODO: Delete a product GET');
};

export const productDeletePOST = function (req: Request, res: Response, next: NextFunction)
{
    res.send('TODO: Delete a product POST');
};