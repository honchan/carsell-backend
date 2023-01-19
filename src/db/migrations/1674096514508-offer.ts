import { MigrationInterface, QueryRunner } from "typeorm";

export class offer1674096514508 implements MigrationInterface {
    name = 'offer1674096514508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."offer_status_enum" AS ENUM('ACCEPTED', 'PENDING', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "offer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "price" integer NOT NULL, "status" "public"."offer_status_enum" NOT NULL DEFAULT 'PENDING', "listingId" uuid, "buyerId" uuid, CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_dadbc0be2373193231f00156950" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_2744d0ba7307ee9a1b981b73069" FOREIGN KEY ("buyerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_2744d0ba7307ee9a1b981b73069"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_dadbc0be2373193231f00156950"`);
        await queryRunner.query(`DROP TABLE "offer"`);
        await queryRunner.query(`DROP TYPE "public"."offer_status_enum"`);
    }

}
