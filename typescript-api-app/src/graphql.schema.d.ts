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

export class IMutation {
    addBlog(input?: BlogInput): BlogRecord | Promise<BlogRecord>;
}

export class IQuery {
    loadBlogs(): BlogRecord[] | Promise<BlogRecord[]>;
    __temp(): boolean | Promise<boolean>;
}
