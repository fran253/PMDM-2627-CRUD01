import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Empresa } from "../empresa/entities/empresa.entity";
import { Proyecto } from "./entities/proyecto.entity";
import { ProyectoController } from "./proyecto.controller";
import { ProyectoService } from "./proyecto.service";

@Module({
  imports: [TypeOrmModule.forFeature([Empresa, Proyecto])],
  controllers: [ProyectoController],
  providers: [ProyectoService],
})
export class ProyectoModule {}