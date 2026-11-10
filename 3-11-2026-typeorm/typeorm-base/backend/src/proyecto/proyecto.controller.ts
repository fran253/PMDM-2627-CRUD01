import { Controller, Get, Post, Patch, Body, Param, Query, Delete } from "@nestjs/common";
import { ProyectoService } from "./proyecto.service";

@Controller("proyectos")
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Get()
  findAll() {
    return this.proyectoService.findAll();
  }

  @Get("empresa/:principalId")
  findByEmpresa(@Param("principalId") principalId: string) {
    return this.proyectoService.findByEmpresa(Number(principalId));
  }

  @Get("buscar")
  searchByName(@Query("texto") text: string) {
    return this.proyectoService.searchByName(text);
  }

   @Get("empresa/:principalId/minimo/:minimum")
  findByEmpresaAndMinimum(
    @Param("principalId") principalId: string,
    @Param("minimum") minimum: string,
  ) {
    return this.proyectoService.findByEmpresaAndMinimum(Number(principalId), Number(minimum));
  }

    @Get("resumen/empresa")
    countByEmpresa() {
    return this.proyectoService.countByEmpresa();
  }

  // Crear Proyecto
  @Post()
  crearProyecto(@Body() body: { nombre: string; horasEstimadas: number; empresaId: number }) {
    return this.proyectoService.crearProyecto(body);
  }

  //mostrar proyecto por id
  @Get(":id")
  findById(@Param("id") id: string) {
    return this.proyectoService.findById(Number(id));
  }

  // borrar proyecto
  @Delete(":id")
  eliminarProyecto(@Param("id") id: string) {
    return this.proyectoService.eliminarProyecto(Number(id));
  }

  // Modificar
  @Patch(":id")
  modificarProyecto(
    @Param("id") id: string,
    @Body() body: { nombre?: string; horasEstimadas?: number; empresaId?: number },
  ) {
    return this.proyectoService.modificarProyecto(Number(id), body);
  }

  //Modificar FK
  @Patch(":id/empresa")
  modificarProyectoClaveForanea(
    @Param("id") id: string,
    @Body() body: { empresaId: number },
  ) {
    return this.proyectoService.modificarProyectoClaveForanea(Number(id), body.empresaId);
  }

}