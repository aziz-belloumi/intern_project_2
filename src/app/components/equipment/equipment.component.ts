import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from "@angular/common";

interface Equipment {
  id: string;
  name: string;
  type: string;
  description: string;
  status: 'available' | 'maintenance' | 'unavailable';
  price?: number;
  serialNumber?: string;
  hasWarranty?: boolean;
  isPortable?: boolean;
  owner?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./equipment.component.css']
})
export class EquipmentPageComponent implements OnInit {

  // Equipment arrays
  userEquipment: Equipment[] = [];
  allEquipment: Equipment[] = [];
  filteredEquipment: Equipment[] = [];

  // Form and UI state
  successMessage: boolean = false;
  searchTerm: string = '';
  filterType: string = '';
  filterStatus: string = '';

  // Current user (you might get this from a service)
  currentUser: string = 'current-user-id'; // Replace with actual user ID

  constructor() { }

  ngOnInit(): void {
    this.loadEquipment();
    this.setupFilters();
  }

  // Initialize with sample data (replace with actual API calls)
  loadEquipment(): void {
    // Sample user equipment
    this.userEquipment = [
      {
        id: '1',
        name: 'MacBook Pro 16"',
        type: 'laptop',
        description: 'High-performance laptop for development work. 32GB RAM, 1TB SSD.',
        status: 'available',
        price: 2999.99,
        serialNumber: 'MBP123456',
        hasWarranty: true,
        isPortable: true,
        owner: 'current-user-id',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Canon EOS R5',
        type: 'camera',
        description: '45MP full-frame mirrorless camera with 8K video recording.',
        status: 'maintenance',
        price: 3899.00,
        serialNumber: 'CAM789012',
        hasWarranty: true,
        isPortable: true,
        owner: 'current-user-id',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-10')
      },
      {
        id: '3',
        name: 'MacBook Pro 16"',
        type: 'laptop',
        description: 'High-performance laptop for development work. 32GB RAM, 1TB SSD.',
        status: 'available',
        price: 2999.99,
        serialNumber: 'MBP123456',
        hasWarranty: true,
        isPortable: true,
        owner: 'current-user-id',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '4',
        name: 'Canon EOS R5',
        type: 'camera',
        description: '45MP full-frame mirrorless camera with 8K video recording.',
        status: 'maintenance',
        price: 3899.00,
        serialNumber: 'CAM789012',
        hasWarranty: true,
        isPortable: true,
        owner: 'current-user-id',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-10')
      }
    ];

    // Sample all equipment (including user's and others')
    this.allEquipment = [
      ...this.userEquipment,
      {
        id: '3',
        name: 'Dell XPS Desktop',
        type: 'desktop',
        description: 'Powerful desktop computer for video editing and 3D rendering.',
        status: 'available',
        price: 1899.99,
        serialNumber: 'DELL345678',
        hasWarranty: false,
        isPortable: false,
        owner: 'other-user-1',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: '4',
        name: 'Epson Projector',
        type: 'projector',
        description: '4K projector for presentations and meetings.',
        status: 'available',
        price: 1299.00,
        serialNumber: 'PROJ901234',
        hasWarranty: true,
        isPortable: true,
        owner: 'other-user-2',
        createdAt: new Date('2024-02-05'),
        updatedAt: new Date('2024-02-05')
      },
      {
        id: '5',
        name: 'Audio Interface',
        type: 'audio',
        description: 'Professional audio interface for recording and mixing.',
        status: 'unavailable',
        price: 599.99,
        serialNumber: 'AUD567890',
        hasWarranty: true,
        isPortable: true,
        owner: 'other-user-3',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-02-15')
      }
    ];

    this.filteredEquipment = [...this.allEquipment];
  }

  // Setup filter watchers
  setupFilters(): void {
    // You might want to use reactive forms or observables for better performance
    // This is a simple implementation
  }

  // Filter equipment based on search term and filters
  filterEquipment(): void {
    this.filteredEquipment = this.allEquipment.filter(equipment => {
      const matchesSearch = !this.searchTerm ||
        equipment.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        equipment.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        equipment.type.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesType = !this.filterType || equipment.type === this.filterType;
      const matchesStatus = !this.filterStatus || equipment.status === this.filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }

  // Handle search term changes
  onSearchChange(): void {
    this.filterEquipment();
  }

  // Handle filter changes
  onFilterChange(): void {
    this.filterEquipment();
  }

  // Add new equipment
  onSubmit(form: NgForm): void {
    if (form.valid) {
      const formData = form.value;

      const newEquipment: Equipment = {
        id: this.generateId(),
        name: formData.name,
        type: formData.type,
        description: formData.description,
        status: formData.status,
        price: formData.price || undefined,
        serialNumber: formData.serialNumber || undefined,
        hasWarranty: formData.hasWarranty || false,
        isPortable: formData.isPortable || false,
        owner: this.currentUser,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Add to user equipment
      this.userEquipment.push(newEquipment);

      // Add to all equipment
      this.allEquipment.push(newEquipment);

      // Update filtered list
      this.filterEquipment();

      // Show success message
      this.showSuccessMessage();

      // Reset form
      form.resetForm();

      console.log('Equipment added:', newEquipment);

      // TODO: Replace with actual API call
      // this.equipmentService.addEquipment(newEquipment).subscribe(
      //   response => {
      //     this.showSuccessMessage();
      //     this.loadEquipment(); // Reload from server
      //   },
      //   error => {
      //     console.error('Error adding equipment:', error);
      //   }
      // );
    }
  }

  // Cancel form
  onCancel(form: NgForm): void {
    form.resetForm();
    this.successMessage = false;
  }

  // Update equipment
  updateEquipment(equipmentId: string): void {
    const equipment = this.userEquipment.find(eq => eq.id === equipmentId);
    if (equipment) {
      // TODO: Implement update modal/form or navigate to update page
      console.log('Update equipment:', equipment);

      // Example: You might want to:
      // 1. Open a modal with pre-filled form
      // 2. Navigate to an edit page
      // 3. Enable inline editing

      // For now, let's simulate an update
      equipment.updatedAt = new Date();

      // TODO: Replace with actual API call
      // this.equipmentService.updateEquipment(equipment).subscribe(
      //   response => {
      //     console.log('Equipment updated successfully');
      //     this.loadEquipment();
      //   },
      //   error => {
      //     console.error('Error updating equipment:', error);
      //   }
      // );
    }
  }

  // Delete equipment
  deleteEquipment(equipmentId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this equipment?');

    if (confirmDelete) {
      // Remove from user equipment
      this.userEquipment = this.userEquipment.filter(eq => eq.id !== equipmentId);

      // Remove from all equipment
      this.allEquipment = this.allEquipment.filter(eq => eq.id !== equipmentId);

      // Update filtered list
      this.filterEquipment();

      console.log('Equipment deleted:', equipmentId);

      // TODO: Replace with actual API call
      // this.equipmentService.deleteEquipment(equipmentId).subscribe(
      //   response => {
      //     console.log('Equipment deleted successfully');
      //     this.loadEquipment();
      //   },
      //   error => {
      //     console.error('Error deleting equipment:', error);
      //   }
      // );
    }
  }

  // Show success message
  private showSuccessMessage(): void {
    this.successMessage = true;
    setTimeout(() => {
      this.successMessage = false;
    }, 5000); // Hide after 5 seconds
  }

  // Generate simple ID (replace with proper UUID in production)
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Helper method to get equipment type display name
  getEquipmentTypeDisplay(type: string): string {
    const typeMap: { [key: string]: string } = {
      'laptop': 'Laptop',
      'desktop': 'Desktop Computer',
      'monitor': 'Monitor',
      'projector': 'Projector',
      'camera': 'Camera',
      'audio': 'Audio Equipment',
      'networking': 'Networking',
      'other': 'Other'
    };

    return typeMap[type] || type;
  }

  // Helper method to get status display name
  getStatusDisplay(status: string): string {
    const statusMap: { [key: string]: string } = {
      'available': 'Available',
      'maintenance': 'Under Maintenance',
      'unavailable': 'Unavailable'
    };

    return statusMap[status] || status;
  }

  // Helper method to format price
  formatPrice(price?: number): string {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }

  // Helper method to format date
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }
}
