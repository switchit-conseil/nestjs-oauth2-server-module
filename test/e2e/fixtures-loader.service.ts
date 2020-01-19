import {Injectable} from "@nestjs/common";
import {Connection, DeepPartial, getRepository} from "typeorm";
import * as path from 'path';
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli/dist';

@Injectable()
export class FixturesLoaderService {
    constructor(private readonly connection: Connection) {}

    loadFixtures = async (fixturesPath: string) => {
        try {
            const loader = new Loader();
            loader.load(path.resolve(fixturesPath));

            const resolver = new Resolver();
            const fixtures = resolver.resolve(loader.fixtureConfigs);
            const builder = new Builder(this.connection, new Parser());

            for (const fixture of fixturesIterator(fixtures)) {
                const entity: any = await builder.build(fixture);
                await getRepository(entity.constructor.name).save(entity);
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}