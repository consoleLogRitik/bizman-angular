import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  features = [
    {
      title: 'Inventory Management',
      description: 'Track your inventory in real-time and manage stock levels efficiently.'
    },
    {
      title: 'Sales Analytics',
      description: 'Gain insights into your sales performance with detailed analytics.'
    },
    {
      title: 'Customer Management',
      description: 'Manage customer relationships and improve customer satisfaction.'
    }
  ];

  benefits = [
    '✔️ User-friendly interface',
    '✔️ 24/7 Customer Support',
    '✔️ Scalable solutions for businesses of all sizes'
  ];

  testimonials = [
    {
      quote: "BizMan has transformed the way we manage our retail operations. It's intuitive and powerful!",
      author: "Jane Doe, Retail Manager"
    },
    {
      quote: "BizMan's customer support is exceptional. They are always ready to help!",
      author: "John Smith, Store Owner"
    },
    {
      quote: "The analytics provided by BizMan have helped us increase our sales significantly.",
      author: "Emily Johnson, Sales Manager"
    }
  ];
}