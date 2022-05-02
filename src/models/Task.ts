import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface iTask extends Model {
    id: number,
    title: string,
    done: number
}

export const Task = sequelize.define<iTask>('Task', {
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
    tableName: 'tasks',
    timestamps: false
});