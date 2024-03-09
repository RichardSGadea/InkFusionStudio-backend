import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointmentsTable1709972478811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments",
                columns:[
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "appointment_date",
                        type: "date",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "status",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "client_id",
                        type: "int",
                    },
                    {
                        name: "worker_id",
                        type: "int",
                    },
                ],
                foreignKeys:[
                    {
                        columnNames:["client_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                    },
                    {
                        columnNames:["worker_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                    },
                ]  
            }),
            true
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("appointments");

    }

}
