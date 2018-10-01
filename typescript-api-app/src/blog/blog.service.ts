/**
 * Blog Service defines the methods for the blog
 */
import { Injectable } from '@nestjs/common';
import * as faker from 'faker';

export interface IBlogInput {
    title: string;
    body: string;
}

export interface IBlogRecord extends IBlogInput{
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

const sampleMarkdown = `# Adest auctoribus udaeque

## Develat nostrae cum felici altos

Lorem markdownum ille puer, ubi et Egeriae **verba celerique laesit**. Mihi
**turba**, lauru utiliter manant, visus dici visa iuvenis si **fuit** melius!
Fui lacrimas deos **laeva argumentum vident** locis, Aegides obest, est, me
digitis excivere tempore dedere!

Sortis Euboicam, voluntas Iuppiter sortis. Actaeona interius civibus sustinet
montibus locum solitumque Phoebus. Et quisque idemque, gementis, de quod, hunc.
Est **abit**, metum mediam, nutrix cursus, divitis, post? Feriat novissima
amicis fit possunt amantes o instant nupsi tollite madentes.

    if (wikiNetiquette + 1 / e_terminal_icann) {
        cloud = application_capacity_gateway.vdu_troll_risc(blobBasic * -5, 1);
        agp_interface = thinPciPiconet + 34;
        login = throughputMulti;
    } else {
        search += keywords;
    }
    var blobHit = dvd(5, 4 - webAddressComputer + hfsMinimizeCd);
    var barSdsl = webcam(compile_dns_file(hyperHardware, sms_ddl(udp,
            openglKeyRuntime)));

## Arbor ensem tumentem in defecto

Moles est Iapeto gurgite **naides**. Hic sua regnis infectum: per: agmen
infractaque, conscendit solis promittet natus laetusque debebit coniuge,
spectans enim! Que at exsiluit postquam haec de colebas partu!

> Ablata consurgere nepotum, qua inguine, nec Sisyphe fulvas proprium Aegides,
> mihi. *Arsuris Oceanus* gelidum, mihi umbra foret Italis.

Verentur perit, tamen tamen artus vestigia. Auro *si ille spatiumque* angues de
piscem fratribus, o exspectare longa, arcus. Erat quod: silvae in fausto
totumque temptat progenitore renovat exprimitur ferus.

1. Auctam eras alteriusque nisi cinnamaque species ducit
2. Veteris fidem
3. Raptor et requiescere Hectora longumque linguae bello
4. Vestigia in sanguine niger estque
5. Vultu iuro fit namque gemuit
6. Nomine bella

Trans despicitur nescia res ire Amphionis [versus
letalis](http://www.mendacialoco.io/cupidogemitus) novercam illa origine. Ad
trepidum metas! In herbida **ne** solet. [Vos rerum](http://iura.com/aitprecor),
dextra, scire Saturnius robusta: verba resolvit similis digiti nos simul.
Noctisque enim, regem ut enim dominae *aure* talia honores obductos si subdita
carmina recepit hos inque paelice violentam convertit.`;

@Injectable()
export class BlogService {

    devBlogs: IBlogRecord[] = [];   // memory-only, DB setup

    constructor() {
        this.devBlogs = generateBlogs();
    }

    public async  getBlogs(): Promise<IBlogRecord[]> {
        return this.devBlogs;
    }

    public async addBlog(blog: IBlogInput): Promise<IBlogRecord> {
        const now = new Date();
        const newBlogRecord = {
            ...blog,
            id: faker.random.uuid(),
            createdAt: now,
            updatedAt: now
        };
        this.devBlogs.push(newBlogRecord);

        return newBlogRecord;
    }
}

function generateBlogs(count: number = 1): IBlogRecord[] {
    if (count <= 0) {
        return [];
    }
    const newBlog = {
        title: faker.company.catchPhrase(),
        body: sampleMarkdown,
        id: faker.random.uuid(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
    };

    return [newBlog, ...generateBlogs(--count)];
}