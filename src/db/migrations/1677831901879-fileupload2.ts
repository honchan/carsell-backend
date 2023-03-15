import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1677831901879 implements MigrationInterface {
    name = 'migrations1677831901879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "database_file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "filename" character varying NOT NULL, "data" bytea NOT NULL, CONSTRAINT "PK_6a48e4fea10786b44d274ba8175" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatarId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_58f5c71eaab331645112cf8cfa5" UNIQUE ("avatarId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5" FOREIGN KEY ("avatarId") REFERENCES "database_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_58f5c71eaab331645112cf8cfa5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatarId"`);
        await queryRunner.query(`DROP TABLE "database_file"`);
    }

}
