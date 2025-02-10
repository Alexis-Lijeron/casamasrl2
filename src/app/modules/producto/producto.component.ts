import { Component } from '@angular/core';
import { Config } from 'datatables.net';
import { AlertsService } from '../../shared/services/alerts.service';
import { Router } from '@angular/router';
import { PageHeaderComponent } from "../../shared/components/page-header/page-header.component";
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-producto',
  imports: [PageHeaderComponent, DataTablesModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
 data: any = {
    title: 'Productos',
    subtitle: '',
    name: 'Productos'
  };
  
  dtOptions: Config = {};
  
  productos = [
    { id: 1, imagen: 'https://www.saebolivia.com/wp-content/uploads/2022/11/2748.png', nombre: 'Paracetamol', descripcion: 'Medicamento para el dolor', precio: 5.00 },
    { id: 2, imagen: 'https://www.saebolivia.com/wp-content/uploads/2022/11/2748.png', nombre: 'Vitamina C', descripcion: 'Suplemento vitamínico', precio: 10.00 },
    { id: 3, imagen: 'https://www.saebolivia.com/wp-content/uploads/2022/11/2748.png', nombre: 'Crema facial', descripcion: 'Producto de belleza', precio: 15.00 },
    { id: 4, imagen: 'https://www.saebolivia.com/wp-content/uploads/2022/11/2748.png', nombre: 'Arroz', descripcion: 'Producto alimenticio', precio: 1.00 },
    { id: 5, imagen: 'https://www.saebolivia.com/wp-content/uploads/2022/11/2748.png', nombre: 'Jabón', descripcion: 'Producto de limpieza', precio: 2.00 },
    { id: 6, imagen: 'https://www.saebolivia.com/wp-content/uploads/2022/11/2748.png', nombre: 'Cargador', descripcion: 'Producto varios', precio: 20.00 },
  ];
  
  constructor(
    private alertsService: AlertsService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: '/assets/libs/datatables/spanish.json'
      }
    }
  }
  
  async confirmarEliminarProducto(id: number): Promise<void> {
    
    // Buscar la producto por id
    const producto = this.productos.find(producto => producto.id === id);
    
    if (!producto) {
      this.alertsService.alertError('El producto no existe');
      return;
    }
    
    const nombre = producto.nombre;
    const confirmed = await this.alertsService.showConfirmationDialog({
      title: 'Eliminar Categoría',
      text: `¿Seguro que deseas eliminar el producto "${nombre}"?`
    });
    
    if (confirmed) {
      this.eliminarProducto(id);
    }
  }

  eliminarProducto(id: number): void {
    this.productos = this.productos.filter(producto => producto.id !== id);
    this.alertsService.alertSuccess('El producto se eliminó correctamente');
  }
  
  goToCreateProducto(): void {
    this.router.navigate(['/dashboard/producto/create']);
  }
  
  goToEditProducto(id: number): void {
    this.router.navigate(['/dashboard/producto/edit', id]);
  }
}
