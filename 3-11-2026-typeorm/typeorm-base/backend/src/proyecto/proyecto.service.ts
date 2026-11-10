import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Empresa } from "../empresa/entities/empresa.entity";
import { Proyecto } from "./entities/proyecto.entity";

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  
  findAll() {
    return this.proyectoRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.empresa", "principal")
      .orderBy("registro.id", "ASC")
      .getMany();
  }

  findByEmpresa(principalId: number) {
    return this.proyectoRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.empresa", "principal")
      .where("principal.id = :principalId", { principalId })
      .orderBy("registro.id", "ASC")
      .getMany();
  }

  searchByName(text: string) {
    return this.proyectoRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.empresa", "principal")
      .where("registro.nombre ILIKE :pattern", { pattern: `%${text}%` })
      .orderBy("registro.id", "ASC")
      .getMany();
  }

    findByEmpresaAndMinimum(principalId: number, minimum: number) {
    return this.proyectoRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.empresa", "principal")
      .where("principal.id = :principalId", { principalId })
      .andWhere("registro.horasEstimadas >= :minimum", { minimum })
      .orderBy("registro.horasEstimadas", "DESC")
      .getMany();
  }

  countByEmpresa() {
    return this.empresaRepository
      .createQueryBuilder("principal")
      .leftJoin("principal.proyectos", "registro")
      .select("principal.id", "id")
      .addSelect("principal.nombre", "nombre")
      .addSelect("COUNT(registro.id)", "total")
      .groupBy("principal.id")
      .addGroupBy("principal.nombre")
      .orderBy("principal.id", "ASC")
      .getRawMany();
  }

  crearProyecto(data: { nombre: string; horasEstimadas: number; empresaId: number }) {
    const nuevoProyecto = this.proyectoRepository.create({
      nombre: data.nombre,
      horasEstimadas: data.horasEstimadas,
      empresa: { id: data.empresaId },
    });

    return this.proyectoRepository.save(nuevoProyecto);
  }

  findById(id: number) {
    return this.proyectoRepository.findOne({
      where: { id },
      relations: ["empresa"],
    });
  }

  eliminarProyecto(id: number) {
    return this.proyectoRepository.delete(id);
  }

  modificarProyecto(id: number, data: { nombre?: string; horasEstimadas?: number; empresaId?: number }) {
    return this.proyectoRepository.update(id, {
      nombre: data.nombre,
      horasEstimadas: data.horasEstimadas,
      empresa: data.empresaId ? { id: data.empresaId } : undefined,
    });
  }

  modificarProyectoClaveForanea(id: number, empresaId: number) {
    return this.proyectoRepository.update(id, {
      empresa: { id: empresaId },
    });
  }


}