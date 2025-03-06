import { Injectable } from '@angular/core';
import { Client, Account } from 'appwrite';

@Injectable({
  providedIn: 'root'
})
export class AppwriteService {
  private client: Client;
  private account: Account;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
      .setProject('67c826a10014c0d5eed1'); // Your project ID

    this.account = new Account(this.client);
  }

  async login(email: string|any, password: string|any) {
    return await this.account.createEmailPasswordSession(email, password);
  }

  async logout() {
    return await this.account.deleteSession('current');
  }

  async signup(email: string|any, password: string|any, name: string|any) {
    const res =  await this.account.create('unique()', email, password, name);
    this.account.createEmailPasswordSession(email, password);
    return res;
  }
  async getCurrentUser() {
    return await this.account.get();
  }
}