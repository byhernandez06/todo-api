import { Model, DataTypes, ForeignKey } from 'sequelize';
import sequelize from '../database';
import User from './User';

class Todo extends Model {
    public id!: number;
    public title!: string;
    public description?: string;
    public completed!: boolean;
    public userId!: ForeignKey<User['id']>;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Todo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'todos',
    }
);

User.hasMany(Todo, { foreignKey: 'userId' });
Todo.belongsTo(User, { foreignKey: 'userId' });

export default Todo;
