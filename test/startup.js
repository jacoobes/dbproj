import { rmSync } from 'fs'
import { initiate } from '../db.js'
//mock env

export async function init_test() {
    return initiate("./test.db")
}

export async function destroy_test(ctx) {
    rmSync("./test.db")
    await ctx.destroy()
}
