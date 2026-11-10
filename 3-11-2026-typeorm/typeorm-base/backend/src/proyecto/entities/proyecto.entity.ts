import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Empresa } from "../../empresa/entities/empresa.entity";

@Entity({ name: "PROYECTO" })
export class Proyecto {
  @PrimaryGeneratedColumn({ name: "ID" })
  id!: number;

  @Column({ name: "NOMBRE", type: "varchar", length: 120 })
  nombre!: string;

  @Column({ name: "HORAS_ESTIMADAS", type: "integer" })
  horasEstimadas!: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.proyectos, { nullable: false })

  @JoinColumn({ name: "ID_EMPRESA" })

  empresa!: Empresa;
}