import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointmentPortfolioTable1709972847429 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointment_portfolio",
                columns:[
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "appointment_id",
                        type: "int",
                    },
                    {
                        name: "portfolio_id",
                        type: "int",
                    },
                ],
                foreignKeys:[
                    {
                        columnNames:["appointment_id"],
                        referencedTableName: "appointments",
                        referencedColumnNames: ["id"],
                    },
                    {
                        columnNames:["portfolio_id"],
                        referencedTableName: "portfolio",
                        referencedColumnNames: ["id"],
                    },
                ]  
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("appointment_portfolio");

    }

}
