import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Item } from './models';
import { PaginatedItemsResponse, ResponseMessage } from './types';
import jwt from 'jsonwebtoken';

// Get all items with pagination
export const getItems = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const totalCount = await Item.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const items = await Item.find().skip(skip).limit(limit);

    res.json({
      page,
      limit,
      totalPages,
      totalCount,
      items,
    } as PaginatedItemsResponse);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message } as ResponseMessage);
    } else {
      res.status(500).json({ message: 'An unknown error occurred' } as ResponseMessage);
    }
  }
};

// Create a new item
export const createItem = async (req: Request, res: Response) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message } as ResponseMessage);
    } else {
      res.status(500).json({ message: 'An unknown error occurred' } as ResponseMessage);
    }
  }
};

// Update an item
export const updateItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' } as ResponseMessage);
    }

    res.json({ message: 'Item updated', id: itemId } as ResponseMessage);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message } as ResponseMessage);
    } else {
      res.status(500).json({ message: 'An unknown error occurred' } as ResponseMessage);
    }
  }
};

// Delete an item
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const result = await Item.findByIdAndDelete(itemId);

    if (!result) {
      return res.status(404).json({ message: 'Item not found' } as ResponseMessage);
    }

    res.json({ message: 'Item deleted', id: itemId } as ResponseMessage);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message } as ResponseMessage);
    } else {
      res.status(500).json({ message: 'An unknown error occurred' } as ResponseMessage);
    }
  }
};

// Login and generate token
export const login = (req: Request, res: Response) => {
  // Simulate login for demo purposes
  const { username, password } = req.body;

  // For real applications, authenticate user with username and password
  // This is a demo token generation
  const token = jwt.sign({ username }, process.env.JWT_SECRET as string, { expiresIn: '24h' });

  res.json({ token });
};
