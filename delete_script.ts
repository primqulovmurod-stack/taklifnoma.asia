import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const envLocalPath = path.resolve('.env.local');
const envOutput = fs.readFileSync(envLocalPath, 'utf8');

let url = '';
let serviceKey = '';

envOutput.split('\n').forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].trim();
    if (line.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) serviceKey = line.split('=')[1].trim();
});

const supabase = createClient(url, serviceKey);

async function run() {
    const { data: invData, error: invError } = await supabase
        .from('invitations')
        .select('id, slug, content')
        .order('created_at', { ascending: false })
        .limit(10);
        
    if (invError) {
        console.error("Fetch error:", invError);
        return;
    }
    console.log("INVITATIONS:");
    console.log(JSON.stringify(invData, null, 2));
    
    // Find Ali & Laylo
    const target = invData.find(inv => inv.content && inv.content.groomName === 'Ali' && inv.content.brideName === 'Laylo');
    if (target) {
        console.log(`\nFound Ali & Laylo with ID: ${target.id}`);
        // Delete it
        const { error: delError } = await supabase.from('invitations').delete().eq('id', target.id);
        if (delError) {
            console.error("Delete error:", delError);
        } else {
            console.log("Deleted Ali & Laylo successfully via script!");
        }
    } else {
        console.log("Ali & Laylo not found in the latest 10. You may need to delete by exact ID or id 1 is a mock.");
    }
}

run();
