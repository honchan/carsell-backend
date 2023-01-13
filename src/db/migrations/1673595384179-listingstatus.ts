import { MigrationInterface, QueryRunner } from "typeorm";

export class listingstatus1673595384179 implements MigrationInterface {
    name = 'listingstatus1673595384179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."listing_status_enum" AS ENUM('AVAILABLE', 'SOLD', 'CANCELLED')`);
        await queryRunner.query(`ALTER TABLE "listing" ADD "status" "public"."listing_status_enum" NOT NULL DEFAULT 'AVAILABLE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."listing_status_enum"`);
    }

}
