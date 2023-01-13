import { MigrationInterface, QueryRunner } from "typeorm";

export class reviewListingsUserrating1673509408697 implements MigrationInterface {
    name = 'reviewListingsUserrating1673509408697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "rating" integer NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."listing_condition_enum" AS ENUM('NEW', 'LIKE_NEW', 'USED', 'WELL_USED')`);
        await queryRunner.query(`CREATE TYPE "public"."listing_location_enum" AS ENUM('ISLAND', 'KOWLOON', 'NEW_TERRITORIES')`);
        await queryRunner.query(`CREATE TYPE "public"."listing_category_enum" AS ENUM('Services', 'Computers & Technology', 'Mobile Phones & Gadgets', 'Women''s Fashion', 'Property', 'Men''s Fashion', 'Cars', 'Beauty & Personal Care', 'Luxury', 'Free Items', 'Video Games', 'Photography', 'Furniture & Home Living', 'Babies & Kids', 'Toys', 'Health & Nutrition', 'Sports Equipment', 'Food & Drinks', 'Motorbikes')`);
        await queryRunner.query(`CREATE TABLE "listing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "price" integer NOT NULL, "condition" "public"."listing_condition_enum" NOT NULL DEFAULT 'NEW', "location" "public"."listing_location_enum", "category" "public"."listing_category_enum", "description" character varying NOT NULL, "sellerId" uuid, "buyerId" uuid, CONSTRAINT "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "listing" ADD CONSTRAINT "FK_c4307d9d9d24454eb434e66b16e" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "listing" ADD CONSTRAINT "FK_a4c389044a9c16dc5eebf060b2a" FOREIGN KEY ("buyerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listing" DROP CONSTRAINT "FK_a4c389044a9c16dc5eebf060b2a"`);
        await queryRunner.query(`ALTER TABLE "listing" DROP CONSTRAINT "FK_c4307d9d9d24454eb434e66b16e"`);
        await queryRunner.query(`DROP TABLE "listing"`);
        await queryRunner.query(`DROP TYPE "public"."listing_category_enum"`);
        await queryRunner.query(`DROP TYPE "public"."listing_location_enum"`);
        await queryRunner.query(`DROP TYPE "public"."listing_condition_enum"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
