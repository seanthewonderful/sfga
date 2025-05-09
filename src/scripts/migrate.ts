import { sql } from '@vercel/postgres';
import { readFileSync } from 'fs';
import { join } from 'path';

async function main() {
    try {
        // Read the migration file
        const migrationPath = join(process.cwd(), 'src', 'db', 'migrations', '001_create_blog_posts.sql');
        const migration = readFileSync(migrationPath, 'utf-8');

        // Split the migration into individual statements
        const statements = migration
            .split(';')
            .map(statement => statement.trim())
            .filter(statement => statement.length > 0);

        // Execute each statement
        for (const statement of statements) {
            await sql.query(statement);
            console.log('Executed:', statement.substring(0, 50) + '...');
        }

        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

main(); 