export interface RequestInterface {
    [key:string]: any;
};

export interface CommandInterface {
    bind(): void;
    execute(req: RequestInterface): void;
}
