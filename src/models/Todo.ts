import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface iTodo extends Model {
    id: number,
    title: string,
    done: number
}

export const Todo = sequelize.define<iTodo>('Todo', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    done: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0
    }
}, {
    tableName: 'todos',
    timestamps: false
});