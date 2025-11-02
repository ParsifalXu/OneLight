import { create } from 'zustand';
import { Node } from '../types';

interface NodeStore {
  nodes: Node[];
  addNode: (node: Node) => void;
  updateNode: (id: string, updates: Partial<Node>) => void;
  removeNode: (id: string) => void;
  clearNodes: () => void;
  getNodeById: (id: string) => Node | undefined;
  getChildrenNodes: (parentId: string) => Node[];
}

export const useNodeStore = create<NodeStore>((set, get) => ({
  nodes: [],

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  updateNode: (id, updates) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, ...updates } : node
      ),
    })),

  removeNode: (id) =>
    set((state) => {
      // 递归移除节点及其所有子节点
      const nodesToRemove = new Set<string>([id])
      const findChildren = (parentId: string) => {
        state.nodes.forEach((node) => {
          if (node.parentId === parentId) {
            nodesToRemove.add(node.id)
            findChildren(node.id)
          }
        })
      }
      findChildren(id)
      
      return {
        nodes: state.nodes.filter((node) => !nodesToRemove.has(node.id)),
      }
    }),

  clearNodes: () => set({ nodes: [] }),

  getNodeById: (id) => {
    const state = get();
    return state.nodes.find((node) => node.id === id);
  },

  getChildrenNodes: (parentId) => {
    const state = get();
    return state.nodes.filter((node) => node.parentId === parentId);
  },
}));

