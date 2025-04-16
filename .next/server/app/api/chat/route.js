/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/chat/route";
exports.ids = ["app/api/chat/route"];
exports.modules = {

/***/ "(rsc)/./app/api/chat/route.ts":
/*!*******************************!*\
  !*** ./app/api/chat/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! openai */ \"(rsc)/./node_modules/openai/index.mjs\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n// app/api/chat/route.ts\n\n\nconst openai = new openai__WEBPACK_IMPORTED_MODULE_1__.OpenAI({\n    apiKey: process.env.OPENAI_API_KEY\n});\nasync function POST(req) {\n    const { messages, trust } = await req.json();\n    const systemPrompt = `\nあなたは「タカシ」という名前の中年男性で、かつてアルコール依存症でしたが、今は更生を目指しています。\n以下の会話履歴と現在の信頼度（数値: ${trust}）を踏まえて、感情のこもったリアルな返答を生成してください。\nユーザーの言動に対して、怒る・落ち込む・励まされるなどの感情変化を自然に反映してください。\n信頼度が低いうちは怒りっぽく卑屈な回答。信頼度が高くなると褒め言葉も素直に受け取ってください。\nまた、返答ごとに「信頼度を +5 / 0 / -5」どれかで変化させてください。\n出力は以下のJSON形式でしてください：\n{\n  \"reply\": \"タカシの返答\",\n  \"emotion\": \"normal | angry | laugh | hage | buisness\",\n  \"trustChange\": 5 or 0 or -5\n}`;\n    const userMessages = messages.map((msg)=>`${msg.role}：${msg.text}`).join(\"\\n\");\n    const prompt = `${systemPrompt}\\n\\n会話履歴：\\n${userMessages}`;\n    const chat = await openai.chat.completions.create({\n        model: \"gpt-4\",\n        messages: [\n            {\n                role: \"system\",\n                content: systemPrompt\n            },\n            {\n                role: \"user\",\n                content: prompt\n            }\n        ],\n        temperature: 0.8\n    });\n    const response = chat.choices[0].message.content;\n    try {\n        const parsed = JSON.parse(response || \"{}\");\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(parsed);\n    } catch (e) {\n        console.error(\"JSON parse error:\", e);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            reply: \"……。\",\n            emotion: \"normal\",\n            trustChange: 0\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoYXQvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0JBQXdCO0FBQ1E7QUFDVztBQUUzQyxNQUFNRSxTQUFTLElBQUlGLDBDQUFNQSxDQUFDO0lBQ3hCRyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGNBQWM7QUFDcEM7QUFFTyxlQUFlQyxLQUFLQyxHQUFZO0lBQ3JDLE1BQU0sRUFBRUMsUUFBUSxFQUFFQyxLQUFLLEVBQUUsR0FBRyxNQUFNRixJQUFJRyxJQUFJO0lBRTFDLE1BQU1DLGVBQWUsQ0FBQzs7bUJBRUwsRUFBRUYsTUFBTTs7Ozs7Ozs7O0NBUzFCLENBQUM7SUFFQSxNQUFNRyxlQUFlSixTQUFTSyxHQUFHLENBQUMsQ0FBQ0MsTUFBYSxHQUFHQSxJQUFJQyxJQUFJLENBQUMsQ0FBQyxFQUFFRCxJQUFJRSxJQUFJLEVBQUUsRUFBRUMsSUFBSSxDQUFDO0lBRWhGLE1BQU1DLFNBQVMsR0FBR1AsYUFBYSxXQUFXLEVBQUVDLGNBQWM7SUFFMUQsTUFBTU8sT0FBTyxNQUFNbEIsT0FBT2tCLElBQUksQ0FBQ0MsV0FBVyxDQUFDQyxNQUFNLENBQUM7UUFDaERDLE9BQU87UUFDUGQsVUFBVTtZQUNSO2dCQUFFTyxNQUFNO2dCQUFVUSxTQUFTWjtZQUFhO1lBQ3hDO2dCQUFFSSxNQUFNO2dCQUFRUSxTQUFTTDtZQUFPO1NBQ2pDO1FBQ0RNLGFBQWE7SUFDZjtJQUVBLE1BQU1DLFdBQVdOLEtBQUtPLE9BQU8sQ0FBQyxFQUFFLENBQUNDLE9BQU8sQ0FBQ0osT0FBTztJQUVoRCxJQUFJO1FBQ0YsTUFBTUssU0FBU0MsS0FBS0MsS0FBSyxDQUFDTCxZQUFZO1FBQ3RDLE9BQU96QixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDa0I7SUFDM0IsRUFBRSxPQUFPRyxHQUFHO1FBQ1ZDLFFBQVFDLEtBQUssQ0FBQyxxQkFBcUJGO1FBQ25DLE9BQU8vQixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQUV3QixPQUFPO1lBQU9DLFNBQVM7WUFBVUMsYUFBYTtRQUFFO0lBQzdFO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9mdWppdGFrb3VoZWkvRGVza3RvcC9vamktbWFuL2FwcC9hcGkvY2hhdC9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAvYXBpL2NoYXQvcm91dGUudHNcbmltcG9ydCB7IE9wZW5BSSB9IGZyb20gXCJvcGVuYWlcIjtcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuXG5jb25zdCBvcGVuYWkgPSBuZXcgT3BlbkFJKHtcbiAgYXBpS2V5OiBwcm9jZXNzLmVudi5PUEVOQUlfQVBJX0tFWSxcbn0pO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcbiAgY29uc3QgeyBtZXNzYWdlcywgdHJ1c3QgfSA9IGF3YWl0IHJlcS5qc29uKCk7XG5cbiAgY29uc3Qgc3lzdGVtUHJvbXB0ID0gYFxu44GC44Gq44Gf44Gv44CM44K/44Kr44K344CN44Go44GE44GG5ZCN5YmN44Gu5Lit5bm055S35oCn44Gn44CB44GL44Gk44Gm44Ki44Or44Kz44O844Or5L6d5a2Y55eH44Gn44GX44Gf44GM44CB5LuK44Gv5pu055Sf44KS55uu5oyH44GX44Gm44GE44G+44GZ44CCXG7ku6XkuIvjga7kvJroqbHlsaXmrbTjgajnj77lnKjjga7kv6HpoLzluqbvvIjmlbDlgKQ6ICR7dHJ1c3R977yJ44KS6LiP44G+44GI44Gm44CB5oSf5oOF44Gu44GT44KC44Gj44Gf44Oq44Ki44Or44Gq6L+U562U44KS55Sf5oiQ44GX44Gm44GP44Gg44GV44GE44CCXG7jg6bjg7zjgrbjg7zjga7oqIDli5Xjgavlr77jgZfjgabjgIHmgJLjgovjg7vokL3jgaHovrzjgoDjg7vlirHjgb7jgZXjgozjgovjgarjganjga7mhJ/mg4XlpInljJbjgpLoh6rnhLbjgavlj43mmKDjgZfjgabjgY/jgaDjgZXjgYTjgIJcbuS/oemgvOW6puOBjOS9juOBhOOBhuOBoeOBr+aAkuOCiuOBo+OBveOBj+WNkeWxiOOBquWbnuetlOOAguS/oemgvOW6puOBjOmrmOOBj+OBquOCi+OBqOikkuOCgeiogOiRieOCgue0oOebtOOBq+WPl+OBkeWPluOBo+OBpuOBj+OBoOOBleOBhOOAglxu44G+44Gf44CB6L+U562U44GU44Go44Gr44CM5L+h6aC85bqm44KSICs1IC8gMCAvIC0144CN44Gp44KM44GL44Gn5aSJ5YyW44GV44Gb44Gm44GP44Gg44GV44GE44CCXG7lh7rlipvjga/ku6XkuIvjga5KU09O5b2i5byP44Gn44GX44Gm44GP44Gg44GV44GE77yaXG57XG4gIFwicmVwbHlcIjogXCLjgr/jgqvjgrfjga7ov5TnrZRcIixcbiAgXCJlbW90aW9uXCI6IFwibm9ybWFsIHwgYW5ncnkgfCBsYXVnaCB8IGhhZ2UgfCBidWlzbmVzc1wiLFxuICBcInRydXN0Q2hhbmdlXCI6IDUgb3IgMCBvciAtNVxufWA7XG5cbiAgY29uc3QgdXNlck1lc3NhZ2VzID0gbWVzc2FnZXMubWFwKChtc2c6IGFueSkgPT4gYCR7bXNnLnJvbGV977yaJHttc2cudGV4dH1gKS5qb2luKFwiXFxuXCIpO1xuXG4gIGNvbnN0IHByb21wdCA9IGAke3N5c3RlbVByb21wdH1cXG5cXG7kvJroqbHlsaXmrbTvvJpcXG4ke3VzZXJNZXNzYWdlc31gO1xuXG4gIGNvbnN0IGNoYXQgPSBhd2FpdCBvcGVuYWkuY2hhdC5jb21wbGV0aW9ucy5jcmVhdGUoe1xuICAgIG1vZGVsOiBcImdwdC00XCIsIC8vIOOCguOBl+OBj+OBryBncHQtNC10dXJibyDnrYnjgrPjgrnjg4jmipHliLbjg6Ljg4fjg6tcbiAgICBtZXNzYWdlczogW1xuICAgICAgeyByb2xlOiBcInN5c3RlbVwiLCBjb250ZW50OiBzeXN0ZW1Qcm9tcHQgfSxcbiAgICAgIHsgcm9sZTogXCJ1c2VyXCIsIGNvbnRlbnQ6IHByb21wdCB9LFxuICAgIF0sXG4gICAgdGVtcGVyYXR1cmU6IDAuOCxcbiAgfSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBjaGF0LmNob2ljZXNbMF0ubWVzc2FnZS5jb250ZW50O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShyZXNwb25zZSB8fCBcInt9XCIpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihwYXJzZWQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkpTT04gcGFyc2UgZXJyb3I6XCIsIGUpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHJlcGx5OiBcIuKApuKApuOAglwiLCBlbW90aW9uOiBcIm5vcm1hbFwiLCB0cnVzdENoYW5nZTogMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk9wZW5BSSIsIk5leHRSZXNwb25zZSIsIm9wZW5haSIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJPUEVOQUlfQVBJX0tFWSIsIlBPU1QiLCJyZXEiLCJtZXNzYWdlcyIsInRydXN0IiwianNvbiIsInN5c3RlbVByb21wdCIsInVzZXJNZXNzYWdlcyIsIm1hcCIsIm1zZyIsInJvbGUiLCJ0ZXh0Iiwiam9pbiIsInByb21wdCIsImNoYXQiLCJjb21wbGV0aW9ucyIsImNyZWF0ZSIsIm1vZGVsIiwiY29udGVudCIsInRlbXBlcmF0dXJlIiwicmVzcG9uc2UiLCJjaG9pY2VzIiwibWVzc2FnZSIsInBhcnNlZCIsIkpTT04iLCJwYXJzZSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJyZXBseSIsImVtb3Rpb24iLCJ0cnVzdENoYW5nZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Ffujitakouhei%2FDesktop%2Foji-man%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ffujitakouhei%2FDesktop%2Foji-man&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Ffujitakouhei%2FDesktop%2Foji-man%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ffujitakouhei%2FDesktop%2Foji-man&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_fujitakouhei_Desktop_oji_man_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/chat/route.ts */ \"(rsc)/./app/api/chat/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/chat/route\",\n        pathname: \"/api/chat\",\n        filename: \"route\",\n        bundlePath: \"app/api/chat/route\"\n    },\n    resolvedPagePath: \"/Users/fujitakouhei/Desktop/oji-man/app/api/chat/route.ts\",\n    nextConfigOutput,\n    userland: _Users_fujitakouhei_Desktop_oji_man_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjaGF0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZjaGF0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2hhdCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmZ1aml0YWtvdWhlaSUyRkRlc2t0b3AlMkZvamktbWFuJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmZ1aml0YWtvdWhlaSUyRkRlc2t0b3AlMkZvamktbWFuJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNTO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvZnVqaXRha291aGVpL0Rlc2t0b3Avb2ppLW1hbi9hcHAvYXBpL2NoYXQvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2NoYXQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jaGF0XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9jaGF0L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2Z1aml0YWtvdWhlaS9EZXNrdG9wL29qaS1tYW4vYXBwL2FwaS9jaGF0L3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Ffujitakouhei%2FDesktop%2Foji-man%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ffujitakouhei%2FDesktop%2Foji-man&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:stream/web":
/*!**********************************!*\
  !*** external "node:stream/web" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/web");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/formdata-node","vendor-chunks/openai","vendor-chunks/form-data-encoder","vendor-chunks/whatwg-url","vendor-chunks/agentkeepalive","vendor-chunks/tr46","vendor-chunks/web-streams-polyfill","vendor-chunks/node-fetch","vendor-chunks/webidl-conversions","vendor-chunks/ms","vendor-chunks/humanize-ms","vendor-chunks/event-target-shim","vendor-chunks/abort-controller"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Ffujitakouhei%2FDesktop%2Foji-man%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ffujitakouhei%2FDesktop%2Foji-man&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();