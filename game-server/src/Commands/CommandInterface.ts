export interface RequestInterface {
    [key:string]: string;
};

export interface CommandInterface {
    bind(): void;
    execute(req: RequestInterface): void;
}
