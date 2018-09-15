export class BlogInput {
    title: string;
    body: string;
}

export class BlogRecord {
    title: string;
    body: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

export abstract class IMutation {
    abstract addBlog(input?: BlogInput): BlogRecord | Promise<BlogRecord>;
}

export abstract class IQuery {
    abstract loadBlogs(): BlogRecord[] | Promise<BlogRecord[]>;
    abstract temp__(): boolean | Promise<boolean>;
}
