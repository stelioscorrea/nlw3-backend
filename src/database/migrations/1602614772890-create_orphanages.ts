import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602614772890 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        /* 
            realiza alterações no banco de dados 
        */
       await queryRunner.createTable(
           new Table({
               name: 'orphanages',
               columns: [
                   {
                        name: 'id',
                        type: 'integer',
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'latitude',
                        type: 'decimal',
                        scale: 10,
                        precision: 2,
                    },
                    {
                        name: 'longitude',
                        type: 'decimal',
                        scale: 10,
                        precision: 2,
                    },
                    {
                        name: 'about',
                        type: 'text'
                    },
                    {
                        name: 'instructions',
                        type: 'varchar'
                    },
                    {
                        name: 'open_on_weekends',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'opening_hours',
                        type: 'varchar'
                    },
            ]
           })
       );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        /*
            desfaz alterações realizadas
        */
       await queryRunner.dropTable('orphanages');
    }

}
