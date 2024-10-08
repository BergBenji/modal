var vr = Object.defineProperty;
var gr = (e, t, n) => t in e ? vr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ne = (e, t, n) => gr(e, typeof t != "symbol" ? t + "" : t, n);
import * as Jt from "vue";
import { watchEffect as J, ref as b, computed as E, cloneVNode as yr, h as L, Fragment as Nt, defineComponent as j, inject as $, provide as z, onMounted as F, onUnmounted as K, watch as ae, shallowRef as wr, unref as A, getCurrentInstance as br, Teleport as xr, reactive as Er, nextTick as hn, normalizeClass as de, openBlock as U, createElementBlock as he, createElementVNode as xe, createVNode as fe, withCtx as Y, createCommentVNode as Fe, renderSlot as De, readonly as Sr, useAttrs as vn, createBlock as Ee, withDirectives as gn, vShow as yn, onBeforeUnmount as Or, resolveDynamicComponent as wn, markRaw as Tr, mergeProps as Kt, withModifiers as Pr } from "vue";
import { usePage as Cr, router as Rr } from "@inertiajs/vue3";
const He = {
  type: "modal",
  modal: {
    closeButton: !0,
    closeExplicitly: !1,
    maxWidth: "2xl",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white rounded",
    position: "center"
  },
  slideover: {
    closeButton: !0,
    closeExplicitly: !1,
    maxWidth: "md",
    paddingClasses: "p-4 sm:p-6",
    panelClasses: "bg-white min-h-screen",
    position: "right"
  }
};
class Ar {
  constructor() {
    this.config = {}, this.reset();
  }
  reset() {
    this.config = JSON.parse(JSON.stringify(He));
  }
  put(t, n) {
    if (typeof t == "object") {
      this.config = {
        type: t.type ?? He.type,
        modal: { ...He.modal, ...t.modal ?? {} },
        slideover: { ...He.slideover, ...t.slideover ?? {} }
      };
      return;
    }
    const r = t.split(".");
    let o = this.config;
    for (let s = 0; s < r.length - 1; s++)
      o = o[r[s]] = o[r[s]] || {};
    o[r[r.length - 1]] = n;
  }
  get(t) {
    if (typeof t > "u")
      return this.config;
    const n = t.split(".");
    let r = this.config;
    for (const o of n) {
      if (r[o] === void 0)
        return null;
      r = r[o];
    }
    return r;
  }
}
const Ze = new Ar(), Sa = () => Ze.reset(), Oa = (e, t) => Ze.put(e, t), Lr = (e) => Ze.get(e), be = (e, t) => Ze.get(e ? `slideover.${t}` : `modal.${t}`);
function Dt(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function ke() {
  let e = [], t = { addEventListener(n, r, o, s) {
    return n.addEventListener(r, o, s), t.add(() => n.removeEventListener(r, o, s));
  }, requestAnimationFrame(...n) {
    let r = requestAnimationFrame(...n);
    t.add(() => cancelAnimationFrame(r));
  }, nextFrame(...n) {
    t.requestAnimationFrame(() => {
      t.requestAnimationFrame(...n);
    });
  }, setTimeout(...n) {
    let r = setTimeout(...n);
    t.add(() => clearTimeout(r));
  }, microTask(...n) {
    let r = { current: !0 };
    return Dt(() => {
      r.current && n[0]();
    }), t.add(() => {
      r.current = !1;
    });
  }, style(n, r, o) {
    let s = n.style.getPropertyValue(r);
    return Object.assign(n.style, { [r]: o }), this.add(() => {
      Object.assign(n.style, { [r]: s });
    });
  }, group(n) {
    let r = ke();
    return n(r), this.add(() => r.dispose());
  }, add(n) {
    return e.push(n), () => {
      let r = e.indexOf(n);
      if (r >= 0) for (let o of e.splice(r, 1)) o();
    };
  }, dispose() {
    for (let n of e.splice(0)) n();
  } };
  return t;
}
var Xt;
let Fr = Symbol("headlessui.useid"), Nr = 0;
const ge = (Xt = Jt.useId) != null ? Xt : function() {
  return Jt.inject(Fr, () => `${++Nr}`)();
};
function C(e) {
  var t;
  if (e == null || e.value == null) return null;
  let n = (t = e.value.$el) != null ? t : e.value;
  return n instanceof Node ? n : null;
}
function Q(e, t, ...n) {
  if (e in t) {
    let o = t[e];
    return typeof o == "function" ? o(...n) : o;
  }
  let r = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((o) => `"${o}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(r, Q), r;
}
var Dr = Object.defineProperty, kr = (e, t, n) => t in e ? Dr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Gt = (e, t, n) => (kr(e, typeof t != "symbol" ? t + "" : t, n), n);
let Br = class {
  constructor() {
    Gt(this, "current", this.detect()), Gt(this, "currentId", 0);
  }
  set(t) {
    this.current !== t && (this.currentId = 0, this.current = t);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
}, Be = new Br();
function Se(e) {
  if (Be.isServer) return null;
  if (e instanceof Node) return e.ownerDocument;
  if (e != null && e.hasOwnProperty("value")) {
    let t = C(e);
    if (t) return t.ownerDocument;
  }
  return document;
}
let gt = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var oe = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(oe || {}), bn = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(bn || {}), $r = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))($r || {});
function jr(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(gt)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var xn = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(xn || {});
function Mr(e, t = 0) {
  var n;
  return e === ((n = Se(e)) == null ? void 0 : n.body) ? !1 : Q(t, { 0() {
    return e.matches(gt);
  }, 1() {
    let r = e;
    for (; r !== null; ) {
      if (r.matches(gt)) return !0;
      r = r.parentElement;
    }
    return !1;
  } });
}
var Ur = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(Ur || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function pe(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let Ir = ["textarea", "input"].join(",");
function Hr(e) {
  var t, n;
  return (n = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Ir)) != null ? n : !1;
}
function qr(e, t = (n) => n) {
  return e.slice().sort((n, r) => {
    let o = t(n), s = t(r);
    if (o === null || s === null) return 0;
    let a = o.compareDocumentPosition(s);
    return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function ze(e, t, { sorted: n = !0, relativeTo: r = null, skipElements: o = [] } = {}) {
  var s;
  let a = (s = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e == null ? void 0 : e.ownerDocument) != null ? s : document, i = Array.isArray(e) ? n ? qr(e) : e : jr(e);
  o.length > 0 && i.length > 1 && (i = i.filter((f) => !o.includes(f))), r = r ?? a.activeElement;
  let c = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), l = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, i.indexOf(r)) - 1;
    if (t & 4) return Math.max(0, i.indexOf(r)) + 1;
    if (t & 8) return i.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), u = t & 32 ? { preventScroll: !0 } : {}, p = 0, v = i.length, g;
  do {
    if (p >= v || p + v <= 0) return 0;
    let f = l + p;
    if (t & 16) f = (f + v) % v;
    else {
      if (f < 0) return 3;
      if (f >= v) return 1;
    }
    g = i[f], g == null || g.focus(u), p += c;
  } while (g !== a.activeElement);
  return t & 6 && Hr(g) && g.select(), 2;
}
function En() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function _r() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Wr() {
  return En() || _r();
}
function qe(e, t, n) {
  Be.isServer || J((r) => {
    document.addEventListener(e, t, n), r(() => document.removeEventListener(e, t, n));
  });
}
function Sn(e, t, n) {
  Be.isServer || J((r) => {
    window.addEventListener(e, t, n), r(() => window.removeEventListener(e, t, n));
  });
}
function zr(e, t, n = E(() => !0)) {
  function r(s, a) {
    if (!n.value || s.defaultPrevented) return;
    let i = a(s);
    if (i === null || !i.getRootNode().contains(i)) return;
    let c = function l(u) {
      return typeof u == "function" ? l(u()) : Array.isArray(u) || u instanceof Set ? u : [u];
    }(e);
    for (let l of c) {
      if (l === null) continue;
      let u = l instanceof HTMLElement ? l : C(l);
      if (u != null && u.contains(i) || s.composed && s.composedPath().includes(u)) return;
    }
    return !Mr(i, xn.Loose) && i.tabIndex !== -1 && s.preventDefault(), t(s, i);
  }
  let o = b(null);
  qe("pointerdown", (s) => {
    var a, i;
    n.value && (o.value = ((i = (a = s.composedPath) == null ? void 0 : a.call(s)) == null ? void 0 : i[0]) || s.target);
  }, !0), qe("mousedown", (s) => {
    var a, i;
    n.value && (o.value = ((i = (a = s.composedPath) == null ? void 0 : a.call(s)) == null ? void 0 : i[0]) || s.target);
  }, !0), qe("click", (s) => {
    Wr() || o.value && (r(s, () => o.value), o.value = null);
  }, !0), qe("touchend", (s) => r(s, () => s.target instanceof HTMLElement ? s.target : null), !0), Sn("blur", (s) => r(s, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
var Ke = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Ke || {}), se = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(se || {});
function H({ visible: e = !0, features: t = 0, ourProps: n, theirProps: r, ...o }) {
  var s;
  let a = Tn(r, n), i = Object.assign(o, { props: a });
  if (e || t & 2 && a.static) return ct(i);
  if (t & 1) {
    let c = (s = a.unmount) == null || s ? 0 : 1;
    return Q(c, { 0() {
      return null;
    }, 1() {
      return ct({ ...o, props: { ...a, hidden: !0, style: { display: "none" } } });
    } });
  }
  return ct(i);
}
function ct({ props: e, attrs: t, slots: n, slot: r, name: o }) {
  var s, a;
  let { as: i, ...c } = Pn(e, ["unmount", "static"]), l = (s = n.default) == null ? void 0 : s.call(n, r), u = {};
  if (r) {
    let p = !1, v = [];
    for (let [g, f] of Object.entries(r)) typeof f == "boolean" && (p = !0), f === !0 && v.push(g);
    p && (u["data-headlessui-state"] = v.join(" "));
  }
  if (i === "template") {
    if (l = On(l ?? []), Object.keys(c).length > 0 || Object.keys(t).length > 0) {
      let [p, ...v] = l ?? [];
      if (!Vr(p) || v.length > 0) throw new Error(['Passing props on "template"!', "", `The current component <${o} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(c).concat(Object.keys(t)).map((h) => h.trim()).filter((h, m, w) => w.indexOf(h) === m).sort((h, m) => h.localeCompare(m)).map((h) => `  - ${h}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((h) => `  - ${h}`).join(`
`)].join(`
`));
      let g = Tn((a = p.props) != null ? a : {}, c, u), f = yr(p, g, !0);
      for (let h in g) h.startsWith("on") && (f.props || (f.props = {}), f.props[h] = g[h]);
      return f;
    }
    return Array.isArray(l) && l.length === 1 ? l[0] : l;
  }
  return L(i, Object.assign({}, c, u), { default: () => l });
}
function On(e) {
  return e.flatMap((t) => t.type === Nt ? On(t.children) : [t]);
}
function Tn(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, n = {};
  for (let r of e) for (let o in r) o.startsWith("on") && typeof r[o] == "function" ? (n[o] != null || (n[o] = []), n[o].push(r[o])) : t[o] = r[o];
  if (t.disabled || t["aria-disabled"]) return Object.assign(t, Object.fromEntries(Object.keys(n).map((r) => [r, void 0])));
  for (let r in n) Object.assign(t, { [r](o, ...s) {
    let a = n[r];
    for (let i of a) {
      if (o instanceof Event && o.defaultPrevented) return;
      i(o, ...s);
    }
  } });
  return t;
}
function Pn(e, t = []) {
  let n = Object.assign({}, e);
  for (let r of t) r in n && delete n[r];
  return n;
}
function Vr(e) {
  return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function";
}
var Xe = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(Xe || {});
let yt = j({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(e, { slots: t, attrs: n }) {
  return () => {
    var r;
    let { features: o, ...s } = e, a = { "aria-hidden": (o & 2) === 2 ? !0 : (r = s["aria-hidden"]) != null ? r : void 0, hidden: (o & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(o & 4) === 4 && (o & 2) !== 2 && { display: "none" } } };
    return H({ ourProps: a, theirProps: s, slot: {}, attrs: n, slots: t, name: "Hidden" });
  };
} }), Cn = Symbol("Context");
var M = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(M || {});
function Jr() {
  return kt() !== null;
}
function kt() {
  return $(Cn, null);
}
function Kr(e) {
  z(Cn, e);
}
var Rn = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Rn || {});
function Xr(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let le = [];
Xr(() => {
  function e(t) {
    t.target instanceof HTMLElement && t.target !== document.body && le[0] !== t.target && (le.unshift(t.target), le = le.filter((n) => n != null && n.isConnected), le.splice(10));
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function An(e, t, n, r) {
  Be.isServer || J((o) => {
    e = e ?? window, e.addEventListener(t, n, r), o(() => e.removeEventListener(t, n, r));
  });
}
var Le = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Le || {});
function Gr() {
  let e = b(0);
  return Sn("keydown", (t) => {
    t.key === "Tab" && (e.value = t.shiftKey ? 1 : 0);
  }), e;
}
function Ln(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let n of e.value) {
    let r = C(n);
    r instanceof HTMLElement && t.add(r);
  }
  return t;
}
var Fn = ((e) => (e[e.None = 1] = "None", e[e.InitialFocus = 2] = "InitialFocus", e[e.TabLock = 4] = "TabLock", e[e.FocusLock = 8] = "FocusLock", e[e.RestoreFocus = 16] = "RestoreFocus", e[e.All = 30] = "All", e))(Fn || {});
let Ce = Object.assign(j({ name: "FocusTrap", props: { as: { type: [Object, String], default: "div" }, initialFocus: { type: Object, default: null }, features: { type: Number, default: 30 }, containers: { type: [Object, Function], default: b(/* @__PURE__ */ new Set()) } }, inheritAttrs: !1, setup(e, { attrs: t, slots: n, expose: r }) {
  let o = b(null);
  r({ el: o, $el: o });
  let s = E(() => Se(o)), a = b(!1);
  F(() => a.value = !0), K(() => a.value = !1), Qr({ ownerDocument: s }, E(() => a.value && !!(e.features & 16)));
  let i = Zr({ ownerDocument: s, container: o, initialFocus: E(() => e.initialFocus) }, E(() => a.value && !!(e.features & 2)));
  eo({ ownerDocument: s, container: o, containers: e.containers, previousActiveElement: i }, E(() => a.value && !!(e.features & 8)));
  let c = Gr();
  function l(g) {
    let f = C(o);
    f && ((h) => h())(() => {
      Q(c.value, { [Le.Forwards]: () => {
        ze(f, oe.First, { skipElements: [g.relatedTarget] });
      }, [Le.Backwards]: () => {
        ze(f, oe.Last, { skipElements: [g.relatedTarget] });
      } });
    });
  }
  let u = b(!1);
  function p(g) {
    g.key === "Tab" && (u.value = !0, requestAnimationFrame(() => {
      u.value = !1;
    }));
  }
  function v(g) {
    if (!a.value) return;
    let f = Ln(e.containers);
    C(o) instanceof HTMLElement && f.add(C(o));
    let h = g.relatedTarget;
    h instanceof HTMLElement && h.dataset.headlessuiFocusGuard !== "true" && (Nn(f, h) || (u.value ? ze(C(o), Q(c.value, { [Le.Forwards]: () => oe.Next, [Le.Backwards]: () => oe.Previous }) | oe.WrapAround, { relativeTo: g.target }) : g.target instanceof HTMLElement && pe(g.target)));
  }
  return () => {
    let g = {}, f = { ref: o, onKeydown: p, onFocusout: v }, { features: h, initialFocus: m, containers: w, ...x } = e;
    return L(Nt, [!!(h & 4) && L(yt, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: l, features: Xe.Focusable }), H({ ourProps: f, theirProps: { ...t, ...x }, slot: g, attrs: t, slots: n, name: "FocusTrap" }), !!(h & 4) && L(yt, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: l, features: Xe.Focusable })]);
  };
} }), { features: Fn });
function Yr(e) {
  let t = b(le.slice());
  return ae([e], ([n], [r]) => {
    r === !0 && n === !1 ? Dt(() => {
      t.value.splice(0);
    }) : r === !1 && n === !0 && (t.value = le.slice());
  }, { flush: "post" }), () => {
    var n;
    return (n = t.value.find((r) => r != null && r.isConnected)) != null ? n : null;
  };
}
function Qr({ ownerDocument: e }, t) {
  let n = Yr(t);
  F(() => {
    J(() => {
      var r, o;
      t.value || ((r = e.value) == null ? void 0 : r.activeElement) === ((o = e.value) == null ? void 0 : o.body) && pe(n());
    }, { flush: "post" });
  }), K(() => {
    t.value && pe(n());
  });
}
function Zr({ ownerDocument: e, container: t, initialFocus: n }, r) {
  let o = b(null), s = b(!1);
  return F(() => s.value = !0), K(() => s.value = !1), F(() => {
    ae([t, n, r], (a, i) => {
      if (a.every((l, u) => (i == null ? void 0 : i[u]) === l) || !r.value) return;
      let c = C(t);
      c && Dt(() => {
        var l, u;
        if (!s.value) return;
        let p = C(n), v = (l = e.value) == null ? void 0 : l.activeElement;
        if (p) {
          if (p === v) {
            o.value = v;
            return;
          }
        } else if (c.contains(v)) {
          o.value = v;
          return;
        }
        p ? pe(p) : ze(c, oe.First | oe.NoScroll) === bn.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), o.value = (u = e.value) == null ? void 0 : u.activeElement;
      });
    }, { immediate: !0, flush: "post" });
  }), o;
}
function eo({ ownerDocument: e, container: t, containers: n, previousActiveElement: r }, o) {
  var s;
  An((s = e.value) == null ? void 0 : s.defaultView, "focus", (a) => {
    if (!o.value) return;
    let i = Ln(n);
    C(t) instanceof HTMLElement && i.add(C(t));
    let c = r.value;
    if (!c) return;
    let l = a.target;
    l && l instanceof HTMLElement ? Nn(i, l) ? (r.value = l, pe(l)) : (a.preventDefault(), a.stopPropagation(), pe(c)) : pe(r.value);
  }, !0);
}
function Nn(e, t) {
  for (let n of e) if (n.contains(t)) return !0;
  return !1;
}
function to(e) {
  let t = wr(e.getSnapshot());
  return K(e.subscribe(() => {
    t.value = e.getSnapshot();
  })), t;
}
function no(e, t) {
  let n = e(), r = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return n;
  }, subscribe(o) {
    return r.add(o), () => r.delete(o);
  }, dispatch(o, ...s) {
    let a = t[o].call(n, ...s);
    a && (n = a, r.forEach((i) => i()));
  } };
}
function ro() {
  let e;
  return { before({ doc: t }) {
    var n;
    let r = t.documentElement;
    e = ((n = t.defaultView) != null ? n : window).innerWidth - r.clientWidth;
  }, after({ doc: t, d: n }) {
    let r = t.documentElement, o = r.clientWidth - r.offsetWidth, s = e - o;
    n.style(r, "paddingRight", `${s}px`);
  } };
}
function oo() {
  return En() ? { before({ doc: e, d: t, meta: n }) {
    function r(o) {
      return n.containers.flatMap((s) => s()).some((s) => s.contains(o));
    }
    t.microTask(() => {
      var o;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let i = ke();
        i.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => i.dispose()));
      }
      let s = (o = window.scrollY) != null ? o : window.pageYOffset, a = null;
      t.addEventListener(e, "click", (i) => {
        if (i.target instanceof HTMLElement) try {
          let c = i.target.closest("a");
          if (!c) return;
          let { hash: l } = new URL(c.href), u = e.querySelector(l);
          u && !r(u) && (a = u);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (i) => {
        if (i.target instanceof HTMLElement) if (r(i.target)) {
          let c = i.target;
          for (; c.parentElement && r(c.parentElement); ) c = c.parentElement;
          t.style(c, "overscrollBehavior", "contain");
        } else t.style(i.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (i) => {
        if (i.target instanceof HTMLElement) {
          if (i.target.tagName === "INPUT") return;
          if (r(i.target)) {
            let c = i.target;
            for (; c.parentElement && c.dataset.headlessuiPortal !== "" && !(c.scrollHeight > c.clientHeight || c.scrollWidth > c.clientWidth); ) c = c.parentElement;
            c.dataset.headlessuiPortal === "" && i.preventDefault();
          } else i.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var i;
        let c = (i = window.scrollY) != null ? i : window.pageYOffset;
        s !== c && window.scrollTo(0, s), a && a.isConnected && (a.scrollIntoView({ block: "nearest" }), a = null);
      });
    });
  } } : {};
}
function so() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function ao(e) {
  let t = {};
  for (let n of e) Object.assign(t, n(t));
  return t;
}
let ue = no(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var n;
  let r = (n = this.get(e)) != null ? n : { doc: e, count: 0, d: ke(), meta: /* @__PURE__ */ new Set() };
  return r.count++, r.meta.add(t), this.set(e, r), this;
}, POP(e, t) {
  let n = this.get(e);
  return n && (n.count--, n.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: n }) {
  let r = { doc: e, d: t, meta: ao(n) }, o = [oo(), ro(), so()];
  o.forEach(({ before: s }) => s == null ? void 0 : s(r)), o.forEach(({ after: s }) => s == null ? void 0 : s(r));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
ue.subscribe(() => {
  let e = ue.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [n] of e) t.set(n, n.documentElement.style.overflow);
  for (let n of e.values()) {
    let r = t.get(n.doc) === "hidden", o = n.count !== 0;
    (o && !r || !o && r) && ue.dispatch(n.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", n), n.count === 0 && ue.dispatch("TEARDOWN", n);
  }
});
function io(e, t, n) {
  let r = to(ue), o = E(() => {
    let s = e.value ? r.value.get(e.value) : void 0;
    return s ? s.count > 0 : !1;
  });
  return ae([e, t], ([s, a], [i], c) => {
    if (!s || !a) return;
    ue.dispatch("PUSH", s, n);
    let l = !1;
    c(() => {
      l || (ue.dispatch("POP", i ?? s, n), l = !0);
    });
  }, { immediate: !0 }), o;
}
let dt = /* @__PURE__ */ new Map(), Re = /* @__PURE__ */ new Map();
function Yt(e, t = b(!0)) {
  J((n) => {
    var r;
    if (!t.value) return;
    let o = C(e);
    if (!o) return;
    n(function() {
      var a;
      if (!o) return;
      let i = (a = Re.get(o)) != null ? a : 1;
      if (i === 1 ? Re.delete(o) : Re.set(o, i - 1), i !== 1) return;
      let c = dt.get(o);
      c && (c["aria-hidden"] === null ? o.removeAttribute("aria-hidden") : o.setAttribute("aria-hidden", c["aria-hidden"]), o.inert = c.inert, dt.delete(o));
    });
    let s = (r = Re.get(o)) != null ? r : 0;
    Re.set(o, s + 1), s === 0 && (dt.set(o, { "aria-hidden": o.getAttribute("aria-hidden"), inert: o.inert }), o.setAttribute("aria-hidden", "true"), o.inert = !0);
  });
}
function lo({ defaultContainers: e = [], portals: t, mainTreeNodeRef: n } = {}) {
  let r = b(null), o = Se(r);
  function s() {
    var a, i, c;
    let l = [];
    for (let u of e) u !== null && (u instanceof HTMLElement ? l.push(u) : "value" in u && u.value instanceof HTMLElement && l.push(u.value));
    if (t != null && t.value) for (let u of t.value) l.push(u);
    for (let u of (a = o == null ? void 0 : o.querySelectorAll("html > *, body > *")) != null ? a : []) u !== document.body && u !== document.head && u instanceof HTMLElement && u.id !== "headlessui-portal-root" && (u.contains(C(r)) || u.contains((c = (i = C(r)) == null ? void 0 : i.getRootNode()) == null ? void 0 : c.host) || l.some((p) => u.contains(p)) || l.push(u));
    return l;
  }
  return { resolveContainers: s, contains(a) {
    return s().some((i) => i.contains(a));
  }, mainTreeNodeRef: r, MainTreeNode() {
    return n != null ? null : L(yt, { features: Xe.Hidden, ref: r });
  } };
}
let Dn = Symbol("ForcePortalRootContext");
function uo() {
  return $(Dn, !1);
}
let wt = j({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: !1 } }, setup(e, { slots: t, attrs: n }) {
  return z(Dn, e.force), () => {
    let { force: r, ...o } = e;
    return H({ theirProps: o, ourProps: {}, slot: {}, slots: t, attrs: n, name: "ForcePortalRoot" });
  };
} }), kn = Symbol("StackContext");
var bt = ((e) => (e[e.Add = 0] = "Add", e[e.Remove = 1] = "Remove", e))(bt || {});
function co() {
  return $(kn, () => {
  });
}
function fo({ type: e, enabled: t, element: n, onUpdate: r }) {
  let o = co();
  function s(...a) {
    r == null || r(...a), o(...a);
  }
  F(() => {
    ae(t, (a, i) => {
      a ? s(0, e, n) : i === !0 && s(1, e, n);
    }, { immediate: !0, flush: "sync" });
  }), K(() => {
    t.value && s(1, e, n);
  }), z(kn, s);
}
let Bn = Symbol("DescriptionContext");
function po() {
  let e = $(Bn, null);
  if (e === null) throw new Error("Missing parent");
  return e;
}
function mo({ slot: e = b({}), name: t = "Description", props: n = {} } = {}) {
  let r = b([]);
  function o(s) {
    return r.value.push(s), () => {
      let a = r.value.indexOf(s);
      a !== -1 && r.value.splice(a, 1);
    };
  }
  return z(Bn, { register: o, slot: e, name: t, props: n }), E(() => r.value.length > 0 ? r.value.join(" ") : void 0);
}
j({ name: "Description", props: { as: { type: [Object, String], default: "p" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: n }) {
  var r;
  let o = (r = e.id) != null ? r : `headlessui-description-${ge()}`, s = po();
  return F(() => K(s.register(o))), () => {
    let { name: a = "Description", slot: i = b({}), props: c = {} } = s, { ...l } = e, u = { ...Object.entries(c).reduce((p, [v, g]) => Object.assign(p, { [v]: A(g) }), {}), id: o };
    return H({ ourProps: u, theirProps: l, slot: i.value, attrs: t, slots: n, name: a });
  };
} });
function ho(e) {
  let t = Se(e);
  if (!t) {
    if (e === null) return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`);
  }
  let n = t.getElementById("headlessui-portal-root");
  if (n) return n;
  let r = t.createElement("div");
  return r.setAttribute("id", "headlessui-portal-root"), t.body.appendChild(r);
}
const xt = /* @__PURE__ */ new WeakMap();
function vo(e) {
  var t;
  return (t = xt.get(e)) != null ? t : 0;
}
function Qt(e, t) {
  let n = t(vo(e));
  return n <= 0 ? xt.delete(e) : xt.set(e, n), n;
}
let $n = j({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(e, { slots: t, attrs: n }) {
  let r = b(null), o = E(() => Se(r)), s = uo(), a = $(jn, null), i = b(s === !0 || a == null ? ho(r.value) : a.resolveTarget());
  i.value && Qt(i.value, (v) => v + 1);
  let c = b(!1);
  F(() => {
    c.value = !0;
  }), J(() => {
    s || a != null && (i.value = a.resolveTarget());
  });
  let l = $(Et, null), u = !1, p = br();
  return ae(r, () => {
    if (u || !l) return;
    let v = C(r);
    v && (K(l.register(v), p), u = !0);
  }), K(() => {
    var v, g;
    let f = (v = o.value) == null ? void 0 : v.getElementById("headlessui-portal-root");
    !f || i.value !== f || Qt(i.value, (h) => h - 1) || i.value.children.length > 0 || (g = i.value.parentElement) == null || g.removeChild(i.value);
  }), () => {
    if (!c.value || i.value === null) return null;
    let v = { ref: r, "data-headlessui-portal": "" };
    return L(xr, { to: i.value }, H({ ourProps: v, theirProps: e, slot: {}, attrs: n, slots: t, name: "Portal" }));
  };
} }), Et = Symbol("PortalParentContext");
function go() {
  let e = $(Et, null), t = b([]);
  function n(s) {
    return t.value.push(s), e && e.register(s), () => r(s);
  }
  function r(s) {
    let a = t.value.indexOf(s);
    a !== -1 && t.value.splice(a, 1), e && e.unregister(s);
  }
  let o = { register: n, unregister: r, portals: t };
  return [t, j({ name: "PortalWrapper", setup(s, { slots: a }) {
    return z(Et, o), () => {
      var i;
      return (i = a.default) == null ? void 0 : i.call(a);
    };
  } })];
}
let jn = Symbol("PortalGroupContext"), yo = j({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(e, { attrs: t, slots: n }) {
  let r = Er({ resolveTarget() {
    return e.target;
  } });
  return z(jn, r), () => {
    let { target: o, ...s } = e;
    return H({ theirProps: s, ourProps: {}, slot: {}, attrs: t, slots: n, name: "PortalGroup" });
  };
} });
var wo = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(wo || {});
let St = Symbol("DialogContext");
function $e(e) {
  let t = $(St, null);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, $e), n;
  }
  return t;
}
let _e = "DC8F892D-2EBD-447C-A4C8-A03058436FF4", bo = j({ name: "Dialog", inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 }, open: { type: [Boolean, String], default: _e }, initialFocus: { type: Object, default: null }, id: { type: String, default: null }, role: { type: String, default: "dialog" } }, emits: { close: (e) => !0 }, setup(e, { emit: t, attrs: n, slots: r, expose: o }) {
  var s, a;
  let i = (s = e.id) != null ? s : `headlessui-dialog-${ge()}`, c = b(!1);
  F(() => {
    c.value = !0;
  });
  let l = !1, u = E(() => e.role === "dialog" || e.role === "alertdialog" ? e.role : (l || (l = !0, console.warn(`Invalid role [${u}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog")), p = b(0), v = kt(), g = E(() => e.open === _e && v !== null ? (v.value & M.Open) === M.Open : e.open), f = b(null), h = E(() => Se(f));
  if (o({ el: f, $el: f }), !(e.open !== _e || v !== null)) throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
  if (typeof g.value != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${g.value === _e ? void 0 : e.open}`);
  let m = E(() => c.value && g.value ? 0 : 1), w = E(() => m.value === 0), x = E(() => p.value > 1), S = $(St, null) !== null, [D, R] = go(), { resolveContainers: N, mainTreeNodeRef: q, MainTreeNode: Z } = lo({ portals: D, defaultContainers: [E(() => {
    var O;
    return (O = we.panelRef.value) != null ? O : f.value;
  })] }), ye = E(() => x.value ? "parent" : "leaf"), Ue = E(() => v !== null ? (v.value & M.Closing) === M.Closing : !1), it = E(() => S || Ue.value ? !1 : w.value), lt = E(() => {
    var O, T, _;
    return (_ = Array.from((T = (O = h.value) == null ? void 0 : O.querySelectorAll("body > *")) != null ? T : []).find((W) => W.id === "headlessui-portal-root" ? !1 : W.contains(C(q)) && W instanceof HTMLElement)) != null ? _ : null;
  });
  Yt(lt, it);
  let G = E(() => x.value ? !0 : w.value), Pe = E(() => {
    var O, T, _;
    return (_ = Array.from((T = (O = h.value) == null ? void 0 : O.querySelectorAll("[data-headlessui-portal]")) != null ? T : []).find((W) => W.contains(C(q)) && W instanceof HTMLElement)) != null ? _ : null;
  });
  Yt(Pe, G), fo({ type: "Dialog", enabled: E(() => m.value === 0), element: f, onUpdate: (O, T) => {
    if (T === "Dialog") return Q(O, { [bt.Add]: () => p.value += 1, [bt.Remove]: () => p.value -= 1 });
  } });
  let ee = mo({ name: "DialogDescription", slot: E(() => ({ open: g.value })) }), te = b(null), we = { titleId: te, panelRef: b(null), dialogState: m, setTitleId(O) {
    te.value !== O && (te.value = O);
  }, close() {
    t("close", !1);
  } };
  z(St, we);
  let Wt = E(() => !(!w.value || x.value));
  zr(N, (O, T) => {
    O.preventDefault(), we.close(), hn(() => T == null ? void 0 : T.focus());
  }, Wt);
  let zt = E(() => !(x.value || m.value !== 0));
  An((a = h.value) == null ? void 0 : a.defaultView, "keydown", (O) => {
    zt.value && (O.defaultPrevented || O.key === Rn.Escape && (O.preventDefault(), O.stopPropagation(), we.close()));
  });
  let Vt = E(() => !(Ue.value || m.value !== 0 || S));
  return io(h, Vt, (O) => {
    var T;
    return { containers: [...(T = O.containers) != null ? T : [], N] };
  }), J((O) => {
    if (m.value !== 0) return;
    let T = C(f);
    if (!T) return;
    let _ = new ResizeObserver((W) => {
      for (let ut of W) {
        let Ie = ut.target.getBoundingClientRect();
        Ie.x === 0 && Ie.y === 0 && Ie.width === 0 && Ie.height === 0 && we.close();
      }
    });
    _.observe(T), O(() => _.disconnect());
  }), () => {
    let { open: O, initialFocus: T, ..._ } = e, W = { ...n, ref: f, id: i, role: u.value, "aria-modal": m.value === 0 ? !0 : void 0, "aria-labelledby": te.value, "aria-describedby": ee.value }, ut = { open: m.value === 0 };
    return L(wt, { force: !0 }, () => [L($n, () => L(yo, { target: f.value }, () => L(wt, { force: !1 }, () => L(Ce, { initialFocus: T, containers: N, features: w.value ? Q(ye.value, { parent: Ce.features.RestoreFocus, leaf: Ce.features.All & ~Ce.features.FocusLock }) : Ce.features.None }, () => L(R, {}, () => H({ ourProps: W, theirProps: { ..._, ...n }, slot: ut, attrs: n, slots: r, visible: m.value === 0, features: Ke.RenderStrategy | Ke.Static, name: "Dialog" })))))), L(Z)]);
  };
} });
j({ name: "DialogOverlay", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: n }) {
  var r;
  let o = (r = e.id) != null ? r : `headlessui-dialog-overlay-${ge()}`, s = $e("DialogOverlay");
  function a(i) {
    i.target === i.currentTarget && (i.preventDefault(), i.stopPropagation(), s.close());
  }
  return () => {
    let { ...i } = e;
    return H({ ourProps: { id: o, "aria-hidden": !0, onClick: a }, theirProps: i, slot: { open: s.dialogState.value === 0 }, attrs: t, slots: n, name: "DialogOverlay" });
  };
} });
j({ name: "DialogBackdrop", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, inheritAttrs: !1, setup(e, { attrs: t, slots: n, expose: r }) {
  var o;
  let s = (o = e.id) != null ? o : `headlessui-dialog-backdrop-${ge()}`, a = $e("DialogBackdrop"), i = b(null);
  return r({ el: i, $el: i }), F(() => {
    if (a.panelRef.value === null) throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.");
  }), () => {
    let { ...c } = e, l = { id: s, ref: i, "aria-hidden": !0 };
    return L(wt, { force: !0 }, () => L($n, () => H({ ourProps: l, theirProps: { ...t, ...c }, slot: { open: a.dialogState.value === 0 }, attrs: t, slots: n, name: "DialogBackdrop" })));
  };
} });
let Mn = j({ name: "DialogPanel", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: n, expose: r }) {
  var o;
  let s = (o = e.id) != null ? o : `headlessui-dialog-panel-${ge()}`, a = $e("DialogPanel");
  r({ el: a.panelRef, $el: a.panelRef });
  function i(c) {
    c.stopPropagation();
  }
  return () => {
    let { ...c } = e, l = { id: s, ref: a.panelRef, onClick: i };
    return H({ ourProps: l, theirProps: c, slot: { open: a.dialogState.value === 0 }, attrs: t, slots: n, name: "DialogPanel" });
  };
} });
j({ name: "DialogTitle", props: { as: { type: [Object, String], default: "h2" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: n }) {
  var r;
  let o = (r = e.id) != null ? r : `headlessui-dialog-title-${ge()}`, s = $e("DialogTitle");
  return F(() => {
    s.setTitleId(o), K(() => s.setTitleId(null));
  }), () => {
    let { ...a } = e;
    return H({ ourProps: { id: o }, theirProps: a, slot: { open: s.dialogState.value === 0 }, attrs: t, slots: n, name: "DialogTitle" });
  };
} });
function xo(e) {
  let t = { called: !1 };
  return (...n) => {
    if (!t.called) return t.called = !0, e(...n);
  };
}
function ft(e, ...t) {
  e && t.length > 0 && e.classList.add(...t);
}
function We(e, ...t) {
  e && t.length > 0 && e.classList.remove(...t);
}
var Ot = ((e) => (e.Finished = "finished", e.Cancelled = "cancelled", e))(Ot || {});
function Eo(e, t) {
  let n = ke();
  if (!e) return n.dispose;
  let { transitionDuration: r, transitionDelay: o } = getComputedStyle(e), [s, a] = [r, o].map((i) => {
    let [c = 0] = i.split(",").filter(Boolean).map((l) => l.includes("ms") ? parseFloat(l) : parseFloat(l) * 1e3).sort((l, u) => u - l);
    return c;
  });
  return s !== 0 ? n.setTimeout(() => t("finished"), s + a) : t("finished"), n.add(() => t("cancelled")), n.dispose;
}
function Zt(e, t, n, r, o, s) {
  let a = ke(), i = s !== void 0 ? xo(s) : () => {
  };
  return We(e, ...o), ft(e, ...t, ...n), a.nextFrame(() => {
    We(e, ...n), ft(e, ...r), a.add(Eo(e, (c) => (We(e, ...r, ...t), ft(e, ...o), i(c))));
  }), a.add(() => We(e, ...t, ...n, ...r, ...o)), a.add(() => i("cancelled")), a.dispose;
}
function ie(e = "") {
  return e.split(/\s+/).filter((t) => t.length > 1);
}
let Bt = Symbol("TransitionContext");
var So = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(So || {});
function Oo() {
  return $(Bt, null) !== null;
}
function To() {
  let e = $(Bt, null);
  if (e === null) throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
function Po() {
  let e = $($t, null);
  if (e === null) throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
let $t = Symbol("NestingContext");
function et(e) {
  return "children" in e ? et(e.children) : e.value.filter(({ state: t }) => t === "visible").length > 0;
}
function Un(e) {
  let t = b([]), n = b(!1);
  F(() => n.value = !0), K(() => n.value = !1);
  function r(s, a = se.Hidden) {
    let i = t.value.findIndex(({ id: c }) => c === s);
    i !== -1 && (Q(a, { [se.Unmount]() {
      t.value.splice(i, 1);
    }, [se.Hidden]() {
      t.value[i].state = "hidden";
    } }), !et(t) && n.value && (e == null || e()));
  }
  function o(s) {
    let a = t.value.find(({ id: i }) => i === s);
    return a ? a.state !== "visible" && (a.state = "visible") : t.value.push({ id: s, state: "visible" }), () => r(s, se.Unmount);
  }
  return { children: t, register: o, unregister: r };
}
let In = Ke.RenderStrategy, tt = j({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: !0 }, appear: { type: [Boolean], default: !1 }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => !0, afterEnter: () => !0, beforeLeave: () => !0, afterLeave: () => !0 }, setup(e, { emit: t, attrs: n, slots: r, expose: o }) {
  let s = b(0);
  function a() {
    s.value |= M.Opening, t("beforeEnter");
  }
  function i() {
    s.value &= ~M.Opening, t("afterEnter");
  }
  function c() {
    s.value |= M.Closing, t("beforeLeave");
  }
  function l() {
    s.value &= ~M.Closing, t("afterLeave");
  }
  if (!Oo() && Jr()) return () => L(Hn, { ...e, onBeforeEnter: a, onAfterEnter: i, onBeforeLeave: c, onAfterLeave: l }, r);
  let u = b(null), p = E(() => e.unmount ? se.Unmount : se.Hidden);
  o({ el: u, $el: u });
  let { show: v, appear: g } = To(), { register: f, unregister: h } = Po(), m = b(v.value ? "visible" : "hidden"), w = { value: !0 }, x = ge(), S = { value: !1 }, D = Un(() => {
    !S.value && m.value !== "hidden" && (m.value = "hidden", h(x), l());
  });
  F(() => {
    let G = f(x);
    K(G);
  }), J(() => {
    if (p.value === se.Hidden && x) {
      if (v.value && m.value !== "visible") {
        m.value = "visible";
        return;
      }
      Q(m.value, { hidden: () => h(x), visible: () => f(x) });
    }
  });
  let R = ie(e.enter), N = ie(e.enterFrom), q = ie(e.enterTo), Z = ie(e.entered), ye = ie(e.leave), Ue = ie(e.leaveFrom), it = ie(e.leaveTo);
  F(() => {
    J(() => {
      if (m.value === "visible") {
        let G = C(u);
        if (G instanceof Comment && G.data === "") throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
      }
    });
  });
  function lt(G) {
    let Pe = w.value && !g.value, ee = C(u);
    !ee || !(ee instanceof HTMLElement) || Pe || (S.value = !0, v.value && a(), v.value || c(), G(v.value ? Zt(ee, R, N, q, Z, (te) => {
      S.value = !1, te === Ot.Finished && i();
    }) : Zt(ee, ye, Ue, it, Z, (te) => {
      S.value = !1, te === Ot.Finished && (et(D) || (m.value = "hidden", h(x), l()));
    })));
  }
  return F(() => {
    ae([v], (G, Pe, ee) => {
      lt(ee), w.value = !1;
    }, { immediate: !0 });
  }), z($t, D), Kr(E(() => Q(m.value, { visible: M.Open, hidden: M.Closed }) | s.value)), () => {
    let { appear: G, show: Pe, enter: ee, enterFrom: te, enterTo: we, entered: Wt, leave: zt, leaveFrom: Vt, leaveTo: O, ...T } = e, _ = { ref: u }, W = { ...T, ...g.value && v.value && Be.isServer ? { class: de([n.class, T.class, ...R, ...N]) } : {} };
    return H({ theirProps: W, ourProps: _, slot: {}, slots: r, attrs: n, features: In, visible: m.value === "visible", name: "TransitionChild" });
  };
} }), Co = tt, Hn = j({ inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: !0 }, appear: { type: [Boolean], default: !1 }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => !0, afterEnter: () => !0, beforeLeave: () => !0, afterLeave: () => !0 }, setup(e, { emit: t, attrs: n, slots: r }) {
  let o = kt(), s = E(() => e.show === null && o !== null ? (o.value & M.Open) === M.Open : e.show);
  J(() => {
    if (![!0, !1].includes(s.value)) throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
  });
  let a = b(s.value ? "visible" : "hidden"), i = Un(() => {
    a.value = "hidden";
  }), c = b(!0), l = { show: s, appear: E(() => e.appear || !c.value) };
  return F(() => {
    J(() => {
      c.value = !1, s.value ? a.value = "visible" : et(i) || (a.value = "hidden");
    });
  }), z($t, i), z(Bt, l), () => {
    let u = Pn(e, ["show", "appear", "unmount", "onBeforeEnter", "onBeforeLeave", "onAfterEnter", "onAfterLeave"]), p = { unmount: e.unmount };
    return H({ ourProps: { ...p, as: "template" }, theirProps: {}, slot: {}, slots: { ...r, default: () => [L(Co, { onBeforeEnter: () => t("beforeEnter"), onAfterEnter: () => t("afterEnter"), onBeforeLeave: () => t("beforeLeave"), onAfterLeave: () => t("afterLeave"), ...n, ...p, ...u }, r.default)] }, attrs: {}, features: In, visible: a.value === "visible", name: "Transition" });
  };
} });
const Ro = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, Ao = {}, Lo = {
  type: "button",
  class: "im-close-button text-gray-400 hover:text-gray-500"
};
function Fo(e, t) {
  return U(), he("button", Lo, t[0] || (t[0] = [
    xe("span", { class: "sr-only" }, "Close", -1),
    xe("svg", {
      class: "size-6",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "2",
      stroke: "currentColor",
      "aria-hidden": "true"
    }, [
      xe("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M6 18L18 6M6 6l12 12"
      })
    ], -1)
  ]));
}
const qn = /* @__PURE__ */ Ro(Ao, [["render", Fo]]), No = { class: "im-modal-container fixed inset-0 z-40 overflow-y-auto p-4" }, Do = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, ko = {
  __name: "ModalContent",
  props: {
    modalContext: Object,
    modalProps: Object
  },
  setup(e) {
    return (t, n) => (U(), he("div", No, [
      xe("div", {
        class: de(["im-modal-positioner flex min-h-full justify-center", {
          "items-start": e.modalProps.position === "top",
          "items-center": e.modalProps.position === "center",
          "items-end": e.modalProps.position === "bottom"
        }])
      }, [
        fe(A(tt), {
          "enter-from": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          "enter-to": "opacity-100 translate-y-0 sm:scale-100",
          "leave-from": "opacity-100 translate-y-0 sm:scale-100",
          "leave-to": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
          class: de({
            "im-modal-wrapper w-full transition duration-300 ease-in-out": !0,
            "blur-sm": !e.modalContext.onTopOfStack,
            "sm:max-w-sm": e.modalProps.maxWidth == "sm",
            "sm:max-w-md": e.modalProps.maxWidth == "md",
            "sm:max-w-md md:max-w-lg": e.modalProps.maxWidth == "lg",
            "sm:max-w-md md:max-w-xl": e.modalProps.maxWidth == "xl",
            "sm:max-w-md md:max-w-xl lg:max-w-2xl": e.modalProps.maxWidth == "2xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl": e.modalProps.maxWidth == "3xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": e.modalProps.maxWidth == "4xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": e.modalProps.maxWidth == "5xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": e.modalProps.maxWidth == "6xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": e.modalProps.maxWidth == "7xl"
          }),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: Y(() => [
            fe(A(Mn), {
              class: de(["im-modal-content relative", [e.modalProps.paddingClasses, e.modalProps.panelClasses]])
            }, {
              default: Y(() => [
                e.modalProps.closeButton ? (U(), he("div", Do, [
                  fe(qn, {
                    onClick: e.modalContext.close
                  }, null, 8, ["onClick"])
                ])) : Fe("", !0),
                De(t.$slots, "default", {
                  modalContext: e.modalContext,
                  modalProps: e.modalProps
                })
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["class", "onAfterLeave"])
      ], 2)
    ]));
  }
};
function _n(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Bo } = Object.prototype, { getPrototypeOf: jt } = Object, nt = /* @__PURE__ */ ((e) => (t) => {
  const n = Bo.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), X = (e) => (e = e.toLowerCase(), (t) => nt(t) === e), rt = (e) => (t) => typeof t === e, { isArray: Oe } = Array, Ne = rt("undefined");
function $o(e) {
  return e !== null && !Ne(e) && e.constructor !== null && !Ne(e.constructor) && I(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Wn = X("ArrayBuffer");
function jo(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Wn(e.buffer), t;
}
const Mo = rt("string"), I = rt("function"), zn = rt("number"), ot = (e) => e !== null && typeof e == "object", Uo = (e) => e === !0 || e === !1, Ve = (e) => {
  if (nt(e) !== "object")
    return !1;
  const t = jt(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Io = X("Date"), Ho = X("File"), qo = X("Blob"), _o = X("FileList"), Wo = (e) => ot(e) && I(e.pipe), zo = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || I(e.append) && ((t = nt(e)) === "formdata" || // detect form-data instance
  t === "object" && I(e.toString) && e.toString() === "[object FormData]"));
}, Vo = X("URLSearchParams"), [Jo, Ko, Xo, Go] = ["ReadableStream", "Request", "Response", "Headers"].map(X), Yo = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function je(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, o;
  if (typeof e != "object" && (e = [e]), Oe(e))
    for (r = 0, o = e.length; r < o; r++)
      t.call(null, e[r], r, e);
  else {
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e), a = s.length;
    let i;
    for (r = 0; r < a; r++)
      i = s[r], t.call(null, e[i], i, e);
  }
}
function Vn(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, o;
  for (; r-- > 0; )
    if (o = n[r], t === o.toLowerCase())
      return o;
  return null;
}
const ce = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Jn = (e) => !Ne(e) && e !== ce;
function Tt() {
  const { caseless: e } = Jn(this) && this || {}, t = {}, n = (r, o) => {
    const s = e && Vn(t, o) || o;
    Ve(t[s]) && Ve(r) ? t[s] = Tt(t[s], r) : Ve(r) ? t[s] = Tt({}, r) : Oe(r) ? t[s] = r.slice() : t[s] = r;
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && je(arguments[r], n);
  return t;
}
const Qo = (e, t, n, { allOwnKeys: r } = {}) => (je(t, (o, s) => {
  n && I(o) ? e[s] = _n(o, n) : e[s] = o;
}, { allOwnKeys: r }), e), Zo = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), es = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, ts = (e, t, n, r) => {
  let o, s, a;
  const i = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), s = o.length; s-- > 0; )
      a = o[s], (!r || r(a, e, t)) && !i[a] && (t[a] = e[a], i[a] = !0);
    e = n !== !1 && jt(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, ns = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, rs = (e) => {
  if (!e) return null;
  if (Oe(e)) return e;
  let t = e.length;
  if (!zn(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, os = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && jt(Uint8Array)), ss = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = r.next()) && !o.done; ) {
    const s = o.value;
    t.call(e, s[0], s[1]);
  }
}, as = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, is = X("HTMLFormElement"), ls = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, o) {
    return r.toUpperCase() + o;
  }
), en = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), us = X("RegExp"), Kn = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  je(n, (o, s) => {
    let a;
    (a = t(o, s, e)) !== !1 && (r[s] = a || o);
  }), Object.defineProperties(e, r);
}, cs = (e) => {
  Kn(e, (t, n) => {
    if (I(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (I(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, ds = (e, t) => {
  const n = {}, r = (o) => {
    o.forEach((s) => {
      n[s] = !0;
    });
  };
  return Oe(e) ? r(e) : r(String(e).split(t)), n;
}, fs = () => {
}, ps = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, pt = "abcdefghijklmnopqrstuvwxyz", tn = "0123456789", Xn = {
  DIGIT: tn,
  ALPHA: pt,
  ALPHA_DIGIT: pt + pt.toUpperCase() + tn
}, ms = (e = 16, t = Xn.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function hs(e) {
  return !!(e && I(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const vs = (e) => {
  const t = new Array(10), n = (r, o) => {
    if (ot(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[o] = r;
        const s = Oe(r) ? [] : {};
        return je(r, (a, i) => {
          const c = n(a, o + 1);
          !Ne(c) && (s[i] = c);
        }), t[o] = void 0, s;
      }
    }
    return r;
  };
  return n(e, 0);
}, gs = X("AsyncFunction"), ys = (e) => e && (ot(e) || I(e)) && I(e.then) && I(e.catch), Gn = ((e, t) => e ? setImmediate : t ? ((n, r) => (ce.addEventListener("message", ({ source: o, data: s }) => {
  o === ce && s === n && r.length && r.shift()();
}, !1), (o) => {
  r.push(o), ce.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  I(ce.postMessage)
), ws = typeof queueMicrotask < "u" ? queueMicrotask.bind(ce) : typeof process < "u" && process.nextTick || Gn, d = {
  isArray: Oe,
  isArrayBuffer: Wn,
  isBuffer: $o,
  isFormData: zo,
  isArrayBufferView: jo,
  isString: Mo,
  isNumber: zn,
  isBoolean: Uo,
  isObject: ot,
  isPlainObject: Ve,
  isReadableStream: Jo,
  isRequest: Ko,
  isResponse: Xo,
  isHeaders: Go,
  isUndefined: Ne,
  isDate: Io,
  isFile: Ho,
  isBlob: qo,
  isRegExp: us,
  isFunction: I,
  isStream: Wo,
  isURLSearchParams: Vo,
  isTypedArray: os,
  isFileList: _o,
  forEach: je,
  merge: Tt,
  extend: Qo,
  trim: Yo,
  stripBOM: Zo,
  inherits: es,
  toFlatObject: ts,
  kindOf: nt,
  kindOfTest: X,
  endsWith: ns,
  toArray: rs,
  forEachEntry: ss,
  matchAll: as,
  isHTMLForm: is,
  hasOwnProperty: en,
  hasOwnProp: en,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Kn,
  freezeMethods: cs,
  toObjectSet: ds,
  toCamelCase: ls,
  noop: fs,
  toFiniteNumber: ps,
  findKey: Vn,
  global: ce,
  isContextDefined: Jn,
  ALPHABET: Xn,
  generateString: ms,
  isSpecCompliantForm: hs,
  toJSONObject: vs,
  isAsyncFn: gs,
  isThenable: ys,
  setImmediate: Gn,
  asap: ws
};
function y(e, t, n, r, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), o && (this.response = o, this.status = o.status ? o.status : null);
}
d.inherits(y, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: d.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Yn = y.prototype, Qn = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Qn[e] = { value: e };
});
Object.defineProperties(y, Qn);
Object.defineProperty(Yn, "isAxiosError", { value: !0 });
y.from = (e, t, n, r, o, s) => {
  const a = Object.create(Yn);
  return d.toFlatObject(e, a, function(c) {
    return c !== Error.prototype;
  }, (i) => i !== "isAxiosError"), y.call(a, e.message, t, n, r, o), a.cause = e, a.name = e.name, s && Object.assign(a, s), a;
};
const bs = null;
function Pt(e) {
  return d.isPlainObject(e) || d.isArray(e);
}
function Zn(e) {
  return d.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function nn(e, t, n) {
  return e ? e.concat(t).map(function(o, s) {
    return o = Zn(o), !n && s ? "[" + o + "]" : o;
  }).join(n ? "." : "") : t;
}
function xs(e) {
  return d.isArray(e) && !e.some(Pt);
}
const Es = d.toFlatObject(d, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function st(e, t, n) {
  if (!d.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = d.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(h, m) {
    return !d.isUndefined(m[h]);
  });
  const r = n.metaTokens, o = n.visitor || u, s = n.dots, a = n.indexes, c = (n.Blob || typeof Blob < "u" && Blob) && d.isSpecCompliantForm(t);
  if (!d.isFunction(o))
    throw new TypeError("visitor must be a function");
  function l(f) {
    if (f === null) return "";
    if (d.isDate(f))
      return f.toISOString();
    if (!c && d.isBlob(f))
      throw new y("Blob is not supported. Use a Buffer instead.");
    return d.isArrayBuffer(f) || d.isTypedArray(f) ? c && typeof Blob == "function" ? new Blob([f]) : Buffer.from(f) : f;
  }
  function u(f, h, m) {
    let w = f;
    if (f && !m && typeof f == "object") {
      if (d.endsWith(h, "{}"))
        h = r ? h : h.slice(0, -2), f = JSON.stringify(f);
      else if (d.isArray(f) && xs(f) || (d.isFileList(f) || d.endsWith(h, "[]")) && (w = d.toArray(f)))
        return h = Zn(h), w.forEach(function(S, D) {
          !(d.isUndefined(S) || S === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? nn([h], D, s) : a === null ? h : h + "[]",
            l(S)
          );
        }), !1;
    }
    return Pt(f) ? !0 : (t.append(nn(m, h, s), l(f)), !1);
  }
  const p = [], v = Object.assign(Es, {
    defaultVisitor: u,
    convertValue: l,
    isVisitable: Pt
  });
  function g(f, h) {
    if (!d.isUndefined(f)) {
      if (p.indexOf(f) !== -1)
        throw Error("Circular reference detected in " + h.join("."));
      p.push(f), d.forEach(f, function(w, x) {
        (!(d.isUndefined(w) || w === null) && o.call(
          t,
          w,
          d.isString(x) ? x.trim() : x,
          h,
          v
        )) === !0 && g(w, h ? h.concat(x) : [x]);
      }), p.pop();
    }
  }
  if (!d.isObject(e))
    throw new TypeError("data must be an object");
  return g(e), t;
}
function rn(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function Mt(e, t) {
  this._pairs = [], e && st(e, this, t);
}
const er = Mt.prototype;
er.append = function(t, n) {
  this._pairs.push([t, n]);
};
er.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, rn);
  } : rn;
  return this._pairs.map(function(o) {
    return n(o[0]) + "=" + n(o[1]);
  }, "").join("&");
};
function Ss(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function tr(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || Ss, o = n && n.serialize;
  let s;
  if (o ? s = o(t, n) : s = d.isURLSearchParams(t) ? t.toString() : new Mt(t, n).toString(r), s) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class on {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    d.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const nr = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Os = typeof URLSearchParams < "u" ? URLSearchParams : Mt, Ts = typeof FormData < "u" ? FormData : null, Ps = typeof Blob < "u" ? Blob : null, Cs = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Os,
    FormData: Ts,
    Blob: Ps
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Ut = typeof window < "u" && typeof document < "u", Ct = typeof navigator == "object" && navigator || void 0, Rs = Ut && (!Ct || ["ReactNative", "NativeScript", "NS"].indexOf(Ct.product) < 0), As = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Ls = Ut && window.location.href || "http://localhost", Fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Ut,
  hasStandardBrowserEnv: Rs,
  hasStandardBrowserWebWorkerEnv: As,
  navigator: Ct,
  origin: Ls
}, Symbol.toStringTag, { value: "Module" })), k = {
  ...Fs,
  ...Cs
};
function Ns(e, t) {
  return st(e, new k.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, o, s) {
      return k.isNode && d.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Ds(e) {
  return d.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function ks(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const o = n.length;
  let s;
  for (r = 0; r < o; r++)
    s = n[r], t[s] = e[s];
  return t;
}
function rr(e) {
  function t(n, r, o, s) {
    let a = n[s++];
    if (a === "__proto__") return !0;
    const i = Number.isFinite(+a), c = s >= n.length;
    return a = !a && d.isArray(o) ? o.length : a, c ? (d.hasOwnProp(o, a) ? o[a] = [o[a], r] : o[a] = r, !i) : ((!o[a] || !d.isObject(o[a])) && (o[a] = []), t(n, r, o[a], s) && d.isArray(o[a]) && (o[a] = ks(o[a])), !i);
  }
  if (d.isFormData(e) && d.isFunction(e.entries)) {
    const n = {};
    return d.forEachEntry(e, (r, o) => {
      t(Ds(r), o, n, 0);
    }), n;
  }
  return null;
}
function Bs(e, t, n) {
  if (d.isString(e))
    try {
      return (t || JSON.parse)(e), d.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (0, JSON.stringify)(e);
}
const Me = {
  transitional: nr,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", o = r.indexOf("application/json") > -1, s = d.isObject(t);
    if (s && d.isHTMLForm(t) && (t = new FormData(t)), d.isFormData(t))
      return o ? JSON.stringify(rr(t)) : t;
    if (d.isArrayBuffer(t) || d.isBuffer(t) || d.isStream(t) || d.isFile(t) || d.isBlob(t) || d.isReadableStream(t))
      return t;
    if (d.isArrayBufferView(t))
      return t.buffer;
    if (d.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let i;
    if (s) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return Ns(t, this.formSerializer).toString();
      if ((i = d.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return st(
          i ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return s || o ? (n.setContentType("application/json", !1), Bs(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Me.transitional, r = n && n.forcedJSONParsing, o = this.responseType === "json";
    if (d.isResponse(t) || d.isReadableStream(t))
      return t;
    if (t && d.isString(t) && (r && !this.responseType || o)) {
      const a = !(n && n.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (i) {
        if (a)
          throw i.name === "SyntaxError" ? y.from(i, y.ERR_BAD_RESPONSE, this, null, this.response) : i;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: k.classes.FormData,
    Blob: k.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
d.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Me.headers[e] = {};
});
const $s = d.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), js = (e) => {
  const t = {};
  let n, r, o;
  return e && e.split(`
`).forEach(function(a) {
    o = a.indexOf(":"), n = a.substring(0, o).trim().toLowerCase(), r = a.substring(o + 1).trim(), !(!n || t[n] && $s[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, sn = Symbol("internals");
function Ae(e) {
  return e && String(e).trim().toLowerCase();
}
function Je(e) {
  return e === !1 || e == null ? e : d.isArray(e) ? e.map(Je) : String(e);
}
function Ms(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const Us = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function mt(e, t, n, r, o) {
  if (d.isFunction(r))
    return r.call(this, t, n);
  if (o && (t = n), !!d.isString(t)) {
    if (d.isString(r))
      return t.indexOf(r) !== -1;
    if (d.isRegExp(r))
      return r.test(t);
  }
}
function Is(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Hs(e, t) {
  const n = d.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(o, s, a) {
        return this[r].call(this, t, o, s, a);
      },
      configurable: !0
    });
  });
}
class B {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const o = this;
    function s(i, c, l) {
      const u = Ae(c);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const p = d.findKey(o, u);
      (!p || o[p] === void 0 || l === !0 || l === void 0 && o[p] !== !1) && (o[p || c] = Je(i));
    }
    const a = (i, c) => d.forEach(i, (l, u) => s(l, u, c));
    if (d.isPlainObject(t) || t instanceof this.constructor)
      a(t, n);
    else if (d.isString(t) && (t = t.trim()) && !Us(t))
      a(js(t), n);
    else if (d.isHeaders(t))
      for (const [i, c] of t.entries())
        s(c, i, r);
    else
      t != null && s(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = Ae(t), t) {
      const r = d.findKey(this, t);
      if (r) {
        const o = this[r];
        if (!n)
          return o;
        if (n === !0)
          return Ms(o);
        if (d.isFunction(n))
          return n.call(this, o, r);
        if (d.isRegExp(n))
          return n.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = Ae(t), t) {
      const r = d.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || mt(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let o = !1;
    function s(a) {
      if (a = Ae(a), a) {
        const i = d.findKey(r, a);
        i && (!n || mt(r, r[i], i, n)) && (delete r[i], o = !0);
      }
    }
    return d.isArray(t) ? t.forEach(s) : s(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, o = !1;
    for (; r--; ) {
      const s = n[r];
      (!t || mt(this, this[s], s, t, !0)) && (delete this[s], o = !0);
    }
    return o;
  }
  normalize(t) {
    const n = this, r = {};
    return d.forEach(this, (o, s) => {
      const a = d.findKey(r, s);
      if (a) {
        n[a] = Je(o), delete n[s];
        return;
      }
      const i = t ? Is(s) : String(s).trim();
      i !== s && delete n[s], n[i] = Je(o), r[i] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return d.forEach(this, (r, o) => {
      r != null && r !== !1 && (n[o] = t && d.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((o) => r.set(o)), r;
  }
  static accessor(t) {
    const r = (this[sn] = this[sn] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function s(a) {
      const i = Ae(a);
      r[i] || (Hs(o, a), r[i] = !0);
    }
    return d.isArray(t) ? t.forEach(s) : s(t), this;
  }
}
B.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
d.reduceDescriptors(B.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
d.freezeMethods(B);
function ht(e, t) {
  const n = this || Me, r = t || n, o = B.from(r.headers);
  let s = r.data;
  return d.forEach(e, function(i) {
    s = i.call(n, s, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), s;
}
function or(e) {
  return !!(e && e.__CANCEL__);
}
function Te(e, t, n) {
  y.call(this, e ?? "canceled", y.ERR_CANCELED, t, n), this.name = "CanceledError";
}
d.inherits(Te, y, {
  __CANCEL__: !0
});
function sr(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new y(
    "Request failed with status code " + n.status,
    [y.ERR_BAD_REQUEST, y.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function qs(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function _s(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let o = 0, s = 0, a;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const l = Date.now(), u = r[s];
    a || (a = l), n[o] = c, r[o] = l;
    let p = s, v = 0;
    for (; p !== o; )
      v += n[p++], p = p % e;
    if (o = (o + 1) % e, o === s && (s = (s + 1) % e), l - a < t)
      return;
    const g = u && l - u;
    return g ? Math.round(v * 1e3 / g) : void 0;
  };
}
function Ws(e, t) {
  let n = 0, r = 1e3 / t, o, s;
  const a = (l, u = Date.now()) => {
    n = u, o = null, s && (clearTimeout(s), s = null), e.apply(null, l);
  };
  return [(...l) => {
    const u = Date.now(), p = u - n;
    p >= r ? a(l, u) : (o = l, s || (s = setTimeout(() => {
      s = null, a(o);
    }, r - p)));
  }, () => o && a(o)];
}
const Ge = (e, t, n = 3) => {
  let r = 0;
  const o = _s(50, 250);
  return Ws((s) => {
    const a = s.loaded, i = s.lengthComputable ? s.total : void 0, c = a - r, l = o(c), u = a <= i;
    r = a;
    const p = {
      loaded: a,
      total: i,
      progress: i ? a / i : void 0,
      bytes: c,
      rate: l || void 0,
      estimated: l && i && u ? (i - a) / l : void 0,
      event: s,
      lengthComputable: i != null,
      [t ? "download" : "upload"]: !0
    };
    e(p);
  }, n);
}, an = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: r
  }), t[1]];
}, ln = (e) => (...t) => d.asap(() => e(...t)), zs = k.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = k.navigator && /(msie|trident)/i.test(k.navigator.userAgent), n = document.createElement("a");
    let r;
    function o(s) {
      let a = s;
      return t && (n.setAttribute("href", a), a = n.href), n.setAttribute("href", a), {
        href: n.href,
        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
        host: n.host,
        search: n.search ? n.search.replace(/^\?/, "") : "",
        hash: n.hash ? n.hash.replace(/^#/, "") : "",
        hostname: n.hostname,
        port: n.port,
        pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
      };
    }
    return r = o(window.location.href), function(a) {
      const i = d.isString(a) ? o(a) : a;
      return i.protocol === r.protocol && i.host === r.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
), Vs = k.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, o, s) {
      const a = [e + "=" + encodeURIComponent(t)];
      d.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()), d.isString(r) && a.push("path=" + r), d.isString(o) && a.push("domain=" + o), s === !0 && a.push("secure"), document.cookie = a.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Js(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Ks(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ar(e, t) {
  return e && !Js(t) ? Ks(e, t) : t;
}
const un = (e) => e instanceof B ? { ...e } : e;
function ve(e, t) {
  t = t || {};
  const n = {};
  function r(l, u, p) {
    return d.isPlainObject(l) && d.isPlainObject(u) ? d.merge.call({ caseless: p }, l, u) : d.isPlainObject(u) ? d.merge({}, u) : d.isArray(u) ? u.slice() : u;
  }
  function o(l, u, p) {
    if (d.isUndefined(u)) {
      if (!d.isUndefined(l))
        return r(void 0, l, p);
    } else return r(l, u, p);
  }
  function s(l, u) {
    if (!d.isUndefined(u))
      return r(void 0, u);
  }
  function a(l, u) {
    if (d.isUndefined(u)) {
      if (!d.isUndefined(l))
        return r(void 0, l);
    } else return r(void 0, u);
  }
  function i(l, u, p) {
    if (p in t)
      return r(l, u);
    if (p in e)
      return r(void 0, l);
  }
  const c = {
    url: s,
    method: s,
    data: s,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    withXSRFToken: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: i,
    headers: (l, u) => o(un(l), un(u), !0)
  };
  return d.forEach(Object.keys(Object.assign({}, e, t)), function(u) {
    const p = c[u] || o, v = p(e[u], t[u], u);
    d.isUndefined(v) && p !== i || (n[u] = v);
  }), n;
}
const ir = (e) => {
  const t = ve({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: o, xsrfCookieName: s, headers: a, auth: i } = t;
  t.headers = a = B.from(a), t.url = tr(ar(t.baseURL, t.url), e.params, e.paramsSerializer), i && a.set(
    "Authorization",
    "Basic " + btoa((i.username || "") + ":" + (i.password ? unescape(encodeURIComponent(i.password)) : ""))
  );
  let c;
  if (d.isFormData(n)) {
    if (k.hasStandardBrowserEnv || k.hasStandardBrowserWebWorkerEnv)
      a.setContentType(void 0);
    else if ((c = a.getContentType()) !== !1) {
      const [l, ...u] = c ? c.split(";").map((p) => p.trim()).filter(Boolean) : [];
      a.setContentType([l || "multipart/form-data", ...u].join("; "));
    }
  }
  if (k.hasStandardBrowserEnv && (r && d.isFunction(r) && (r = r(t)), r || r !== !1 && zs(t.url))) {
    const l = o && s && Vs.read(s);
    l && a.set(o, l);
  }
  return t;
}, Xs = typeof XMLHttpRequest < "u", Gs = Xs && function(e) {
  return new Promise(function(n, r) {
    const o = ir(e);
    let s = o.data;
    const a = B.from(o.headers).normalize();
    let { responseType: i, onUploadProgress: c, onDownloadProgress: l } = o, u, p, v, g, f;
    function h() {
      g && g(), f && f(), o.cancelToken && o.cancelToken.unsubscribe(u), o.signal && o.signal.removeEventListener("abort", u);
    }
    let m = new XMLHttpRequest();
    m.open(o.method.toUpperCase(), o.url, !0), m.timeout = o.timeout;
    function w() {
      if (!m)
        return;
      const S = B.from(
        "getAllResponseHeaders" in m && m.getAllResponseHeaders()
      ), R = {
        data: !i || i === "text" || i === "json" ? m.responseText : m.response,
        status: m.status,
        statusText: m.statusText,
        headers: S,
        config: e,
        request: m
      };
      sr(function(q) {
        n(q), h();
      }, function(q) {
        r(q), h();
      }, R), m = null;
    }
    "onloadend" in m ? m.onloadend = w : m.onreadystatechange = function() {
      !m || m.readyState !== 4 || m.status === 0 && !(m.responseURL && m.responseURL.indexOf("file:") === 0) || setTimeout(w);
    }, m.onabort = function() {
      m && (r(new y("Request aborted", y.ECONNABORTED, e, m)), m = null);
    }, m.onerror = function() {
      r(new y("Network Error", y.ERR_NETWORK, e, m)), m = null;
    }, m.ontimeout = function() {
      let D = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const R = o.transitional || nr;
      o.timeoutErrorMessage && (D = o.timeoutErrorMessage), r(new y(
        D,
        R.clarifyTimeoutError ? y.ETIMEDOUT : y.ECONNABORTED,
        e,
        m
      )), m = null;
    }, s === void 0 && a.setContentType(null), "setRequestHeader" in m && d.forEach(a.toJSON(), function(D, R) {
      m.setRequestHeader(R, D);
    }), d.isUndefined(o.withCredentials) || (m.withCredentials = !!o.withCredentials), i && i !== "json" && (m.responseType = o.responseType), l && ([v, f] = Ge(l, !0), m.addEventListener("progress", v)), c && m.upload && ([p, g] = Ge(c), m.upload.addEventListener("progress", p), m.upload.addEventListener("loadend", g)), (o.cancelToken || o.signal) && (u = (S) => {
      m && (r(!S || S.type ? new Te(null, e, m) : S), m.abort(), m = null);
    }, o.cancelToken && o.cancelToken.subscribe(u), o.signal && (o.signal.aborted ? u() : o.signal.addEventListener("abort", u)));
    const x = qs(o.url);
    if (x && k.protocols.indexOf(x) === -1) {
      r(new y("Unsupported protocol " + x + ":", y.ERR_BAD_REQUEST, e));
      return;
    }
    m.send(s || null);
  });
}, Ys = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), o;
    const s = function(l) {
      if (!o) {
        o = !0, i();
        const u = l instanceof Error ? l : this.reason;
        r.abort(u instanceof y ? u : new Te(u instanceof Error ? u.message : u));
      }
    };
    let a = t && setTimeout(() => {
      a = null, s(new y(`timeout ${t} of ms exceeded`, y.ETIMEDOUT));
    }, t);
    const i = () => {
      e && (a && clearTimeout(a), a = null, e.forEach((l) => {
        l.unsubscribe ? l.unsubscribe(s) : l.removeEventListener("abort", s);
      }), e = null);
    };
    e.forEach((l) => l.addEventListener("abort", s));
    const { signal: c } = r;
    return c.unsubscribe = () => d.asap(i), c;
  }
}, Qs = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, o;
  for (; r < n; )
    o = r + t, yield e.slice(r, o), r = o;
}, Zs = async function* (e, t) {
  for await (const n of ea(e))
    yield* Qs(n, t);
}, ea = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: r } = await t.read();
      if (n)
        break;
      yield r;
    }
  } finally {
    await t.cancel();
  }
}, cn = (e, t, n, r) => {
  const o = Zs(e, t);
  let s = 0, a, i = (c) => {
    a || (a = !0, r && r(c));
  };
  return new ReadableStream({
    async pull(c) {
      try {
        const { done: l, value: u } = await o.next();
        if (l) {
          i(), c.close();
          return;
        }
        let p = u.byteLength;
        if (n) {
          let v = s += p;
          n(v);
        }
        c.enqueue(new Uint8Array(u));
      } catch (l) {
        throw i(l), l;
      }
    },
    cancel(c) {
      return i(c), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, at = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", lr = at && typeof ReadableStream == "function", ta = at && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), ur = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, na = lr && ur(() => {
  let e = !1;
  const t = new Request(k.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), dn = 64 * 1024, Rt = lr && ur(() => d.isReadableStream(new Response("").body)), Ye = {
  stream: Rt && ((e) => e.body)
};
at && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !Ye[t] && (Ye[t] = d.isFunction(e[t]) ? (n) => n[t]() : (n, r) => {
      throw new y(`Response type '${t}' is not supported`, y.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const ra = async (e) => {
  if (e == null)
    return 0;
  if (d.isBlob(e))
    return e.size;
  if (d.isSpecCompliantForm(e))
    return (await new Request(k.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (d.isArrayBufferView(e) || d.isArrayBuffer(e))
    return e.byteLength;
  if (d.isURLSearchParams(e) && (e = e + ""), d.isString(e))
    return (await ta(e)).byteLength;
}, oa = async (e, t) => {
  const n = d.toFiniteNumber(e.getContentLength());
  return n ?? ra(t);
}, sa = at && (async (e) => {
  let {
    url: t,
    method: n,
    data: r,
    signal: o,
    cancelToken: s,
    timeout: a,
    onDownloadProgress: i,
    onUploadProgress: c,
    responseType: l,
    headers: u,
    withCredentials: p = "same-origin",
    fetchOptions: v
  } = ir(e);
  l = l ? (l + "").toLowerCase() : "text";
  let g = Ys([o, s && s.toAbortSignal()], a), f;
  const h = g && g.unsubscribe && (() => {
    g.unsubscribe();
  });
  let m;
  try {
    if (c && na && n !== "get" && n !== "head" && (m = await oa(u, r)) !== 0) {
      let R = new Request(t, {
        method: "POST",
        body: r,
        duplex: "half"
      }), N;
      if (d.isFormData(r) && (N = R.headers.get("content-type")) && u.setContentType(N), R.body) {
        const [q, Z] = an(
          m,
          Ge(ln(c))
        );
        r = cn(R.body, dn, q, Z);
      }
    }
    d.isString(p) || (p = p ? "include" : "omit");
    const w = "credentials" in Request.prototype;
    f = new Request(t, {
      ...v,
      signal: g,
      method: n.toUpperCase(),
      headers: u.normalize().toJSON(),
      body: r,
      duplex: "half",
      credentials: w ? p : void 0
    });
    let x = await fetch(f);
    const S = Rt && (l === "stream" || l === "response");
    if (Rt && (i || S && h)) {
      const R = {};
      ["status", "statusText", "headers"].forEach((ye) => {
        R[ye] = x[ye];
      });
      const N = d.toFiniteNumber(x.headers.get("content-length")), [q, Z] = i && an(
        N,
        Ge(ln(i), !0)
      ) || [];
      x = new Response(
        cn(x.body, dn, q, () => {
          Z && Z(), h && h();
        }),
        R
      );
    }
    l = l || "text";
    let D = await Ye[d.findKey(Ye, l) || "text"](x, e);
    return !S && h && h(), await new Promise((R, N) => {
      sr(R, N, {
        data: D,
        headers: B.from(x.headers),
        status: x.status,
        statusText: x.statusText,
        config: e,
        request: f
      });
    });
  } catch (w) {
    throw h && h(), w && w.name === "TypeError" && /fetch/i.test(w.message) ? Object.assign(
      new y("Network Error", y.ERR_NETWORK, e, f),
      {
        cause: w.cause || w
      }
    ) : y.from(w, w && w.code, e, f);
  }
}), At = {
  http: bs,
  xhr: Gs,
  fetch: sa
};
d.forEach(At, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const fn = (e) => `- ${e}`, aa = (e) => d.isFunction(e) || e === null || e === !1, cr = {
  getAdapter: (e) => {
    e = d.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const o = {};
    for (let s = 0; s < t; s++) {
      n = e[s];
      let a;
      if (r = n, !aa(n) && (r = At[(a = String(n)).toLowerCase()], r === void 0))
        throw new y(`Unknown adapter '${a}'`);
      if (r)
        break;
      o[a || "#" + s] = r;
    }
    if (!r) {
      const s = Object.entries(o).map(
        ([i, c]) => `adapter ${i} ` + (c === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let a = t ? s.length > 1 ? `since :
` + s.map(fn).join(`
`) : " " + fn(s[0]) : "as no adapter specified";
      throw new y(
        "There is no suitable adapter to dispatch the request " + a,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: At
};
function vt(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Te(null, e);
}
function pn(e) {
  return vt(e), e.headers = B.from(e.headers), e.data = ht.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), cr.getAdapter(e.adapter || Me.adapter)(e).then(function(r) {
    return vt(e), r.data = ht.call(
      e,
      e.transformResponse,
      r
    ), r.headers = B.from(r.headers), r;
  }, function(r) {
    return or(r) || (vt(e), r && r.response && (r.response.data = ht.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = B.from(r.response.headers))), Promise.reject(r);
  });
}
const dr = "1.7.7", It = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  It[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const mn = {};
It.transitional = function(t, n, r) {
  function o(s, a) {
    return "[Axios v" + dr + "] Transitional option '" + s + "'" + a + (r ? ". " + r : "");
  }
  return (s, a, i) => {
    if (t === !1)
      throw new y(
        o(a, " has been removed" + (n ? " in " + n : "")),
        y.ERR_DEPRECATED
      );
    return n && !mn[a] && (mn[a] = !0, console.warn(
      o(
        a,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(s, a, i) : !0;
  };
};
function ia(e, t, n) {
  if (typeof e != "object")
    throw new y("options must be an object", y.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let o = r.length;
  for (; o-- > 0; ) {
    const s = r[o], a = t[s];
    if (a) {
      const i = e[s], c = i === void 0 || a(i, s, e);
      if (c !== !0)
        throw new y("option " + s + " must be " + c, y.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new y("Unknown option " + s, y.ERR_BAD_OPTION);
  }
}
const Lt = {
  assertOptions: ia,
  validators: It
}, re = Lt.validators;
class me {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new on(),
      response: new on()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let o;
        Error.captureStackTrace ? Error.captureStackTrace(o = {}) : o = new Error();
        const s = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? s && !String(r.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + s) : r.stack = s;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = ve(this.defaults, n);
    const { transitional: r, paramsSerializer: o, headers: s } = n;
    r !== void 0 && Lt.assertOptions(r, {
      silentJSONParsing: re.transitional(re.boolean),
      forcedJSONParsing: re.transitional(re.boolean),
      clarifyTimeoutError: re.transitional(re.boolean)
    }, !1), o != null && (d.isFunction(o) ? n.paramsSerializer = {
      serialize: o
    } : Lt.assertOptions(o, {
      encode: re.function,
      serialize: re.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let a = s && d.merge(
      s.common,
      s[n.method]
    );
    s && d.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (f) => {
        delete s[f];
      }
    ), n.headers = B.concat(a, s);
    const i = [];
    let c = !0;
    this.interceptors.request.forEach(function(h) {
      typeof h.runWhen == "function" && h.runWhen(n) === !1 || (c = c && h.synchronous, i.unshift(h.fulfilled, h.rejected));
    });
    const l = [];
    this.interceptors.response.forEach(function(h) {
      l.push(h.fulfilled, h.rejected);
    });
    let u, p = 0, v;
    if (!c) {
      const f = [pn.bind(this), void 0];
      for (f.unshift.apply(f, i), f.push.apply(f, l), v = f.length, u = Promise.resolve(n); p < v; )
        u = u.then(f[p++], f[p++]);
      return u;
    }
    v = i.length;
    let g = n;
    for (p = 0; p < v; ) {
      const f = i[p++], h = i[p++];
      try {
        g = f(g);
      } catch (m) {
        h.call(this, m);
        break;
      }
    }
    try {
      u = pn.call(this, g);
    } catch (f) {
      return Promise.reject(f);
    }
    for (p = 0, v = l.length; p < v; )
      u = u.then(l[p++], l[p++]);
    return u;
  }
  getUri(t) {
    t = ve(this.defaults, t);
    const n = ar(t.baseURL, t.url);
    return tr(n, t.params, t.paramsSerializer);
  }
}
d.forEach(["delete", "get", "head", "options"], function(t) {
  me.prototype[t] = function(n, r) {
    return this.request(ve(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
d.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(s, a, i) {
      return this.request(ve(i || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: a
      }));
    };
  }
  me.prototype[t] = n(), me.prototype[t + "Form"] = n(!0);
});
class Ht {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(s) {
      n = s;
    });
    const r = this;
    this.promise.then((o) => {
      if (!r._listeners) return;
      let s = r._listeners.length;
      for (; s-- > 0; )
        r._listeners[s](o);
      r._listeners = null;
    }), this.promise.then = (o) => {
      let s;
      const a = new Promise((i) => {
        r.subscribe(i), s = i;
      }).then(o);
      return a.cancel = function() {
        r.unsubscribe(s);
      }, a;
    }, t(function(s, a, i) {
      r.reason || (r.reason = new Te(s, a, i), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (r) => {
      t.abort(r);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Ht(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
}
function la(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function ua(e) {
  return d.isObject(e) && e.isAxiosError === !0;
}
const Ft = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Ft).forEach(([e, t]) => {
  Ft[t] = e;
});
function fr(e) {
  const t = new me(e), n = _n(me.prototype.request, t);
  return d.extend(n, me.prototype, t, { allOwnKeys: !0 }), d.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(o) {
    return fr(ve(e, o));
  }, n;
}
const P = fr(Me);
P.Axios = me;
P.CanceledError = Te;
P.CancelToken = Ht;
P.isCancel = or;
P.VERSION = dr;
P.toFormData = st;
P.AxiosError = y;
P.Cancel = P.CanceledError;
P.all = function(t) {
  return Promise.all(t);
};
P.spread = la;
P.isAxiosError = ua;
P.mergeConfig = ve;
P.AxiosHeaders = B;
P.formToJSON = (e) => rr(d.isHTMLForm(e) ? new FormData(e) : e);
P.getAdapter = cr.getAdapter;
P.HttpStatusCode = Ft;
P.default = P;
function ca(e, t) {
  return Array.isArray(e) ? e.filter((n) => !t.includes(n)) : Object.keys(e).reduce((n, r) => (t.includes(r) || (n[r] = e[r]), n), {});
}
function qt(e, t) {
  return Array.isArray(e) ? e.filter((n) => t.includes(n)) : t.reduce((n, r) => (r in e && (n[r] = e[r]), n), {});
}
function da(e) {
  return Array.isArray(e) ? e.filter((t) => t !== null) : Object.keys(e).reduce((t, n) => (n in e && e[n] !== null && (t[n] = e[n]), t), {});
}
const V = b([]), Qe = b({});
class _t {
  constructor(t, n, r, o, s) {
    ne(this, "getAdjacentModal", (t) => {
      const n = this.index.value;
      return V.value[n + t] ?? null;
    });
    ne(this, "isOnTopOfStack", () => V.value.length < 2 || V.value[V.value.length - 1].id === this.id);
    ne(this, "close", () => {
      const t = this.index.value;
      t > -1 && (Object.keys(this.listeners).forEach((n) => {
        this.off(n);
      }), V.value[t].open = !1, this.onCloseCallback());
    });
    ne(this, "afterLeave", () => {
      V.value = V.value.filter((t) => t.id !== this.id), this.afterLeaveCallback();
    });
    ne(this, "on", (t, n) => {
      this.listeners[t] = this.listeners[t] ?? [], this.listeners[t].push(n);
    });
    ne(this, "off", (t, n) => {
      var r;
      n ? this.listeners[t] = ((r = this.listeners[t]) == null ? void 0 : r.filter((o) => o !== n)) ?? [] : delete this.listeners[t];
    });
    ne(this, "emit", (t, ...n) => {
      var r;
      (r = this.listeners[t]) == null || r.forEach((o) => o(...n));
    });
    ne(this, "reload", (t = {}) => {
      let n = Object.keys(this.response.props);
      t.only && (n = qt(n, t.only)), t.except && (n = ca(n, t.except)), P.get(this.response.url, {
        headers: {
          "X-Inertia": !0,
          "X-Inertia-Partial-Component": this.response.component,
          "X-Inertia-Version": this.response.version,
          "X-Inertia-Partial-Data": n.join(",")
        }
      }).then((r) => {
        Object.assign(this.componentProps.value, r.data.props);
      });
    });
    this.id = _t.generateId(), this.open = !1, this.listeners = {}, this.component = t, this.componentProps = b(n.props), this.response = n, this.modalProps = r, this.onCloseCallback = o, this.afterLeaveCallback = s, this.index = E(() => V.value.findIndex((a) => a.id === this.id)), this.getParentModal = () => this.getAdjacentModal(-1), this.getChildModal = () => this.getAdjacentModal(1), this.onTopOfStack = E(() => this.isOnTopOfStack());
  }
  static generateId() {
    return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `inertiaui_modal_${crypto.randomUUID()}` : `inertiaui_modal_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
function fa(e, t) {
  Qe.value[e] = { name: e, callback: t };
}
function pa(e, t, n, r) {
  if (Qe.value[e]) {
    const o = pr(null, {}, t, n, r);
    return o.name = e, Qe.value[e].callback(o), o;
  }
}
function pr(e, t, n, r, o) {
  const s = new _t(e, t, n, r, o);
  return V.value.push(s), s;
}
const mr = ["closeButton", "closeExplicitly", "maxWidth", "paddingClasses", "panelClasses", "position", "slideover"];
function hr() {
  return {
    stack: Sr(V),
    push: pr,
    reset: () => V.value = [],
    callLocalModal: pa,
    registerLocalModal: fa,
    removeLocalModal: (e) => delete Qe.value[e]
  };
}
const ma = {
  class: "im-backdrop fixed inset-0 z-30 bg-black/75",
  "aria-hidden": "true"
}, ha = {
  key: 1,
  class: "im-backdrop fixed inset-0 z-30 bg-black/75"
}, va = {
  __name: "ModalWrapper",
  props: {
    // The slideover prop in on top because we need to know if it's a slideover
    // before we can determine the defaule value of other props
    slideover: {
      type: Boolean,
      default: () => Lr("type") === "slideover"
    },
    closeButton: {
      type: Boolean,
      default: (e) => be(e.slideover, "closeButton")
    },
    closeExplicitly: {
      type: Boolean,
      default: (e) => be(e.slideover, "closeExplicitly")
    },
    maxWidth: {
      type: String,
      default: (e) => be(e.slideover, "maxWidth")
    },
    paddingClasses: {
      type: [Boolean, String],
      default: (e) => be(e.slideover, "paddingClasses")
    },
    panelClasses: {
      type: [Boolean, String],
      default: (e) => be(e.slideover, "panelClasses")
    },
    position: {
      type: String,
      default: (e) => be(e.slideover, "position")
    }
  },
  setup(e) {
    const t = e, n = $("modalContext"), r = E(() => ({
      ...qt(t, mr),
      ...n.value.modalProps
    }));
    function o() {
      r.value.closeExplicitly || n.value.close();
    }
    const s = vn();
    return Object.keys(s).filter((a) => a.startsWith("on")).forEach((a) => {
      const i = a.replace(/^on/, "").replace(/^./, (c) => c.toLowerCase()).replace(/([A-Z])/g, "-$1").toLowerCase();
      n.value.on(i, s[a]);
    }), (a, i) => {
      var c;
      return U(), Ee(A(Hn), {
        unmount: !1,
        show: ((c = A(n)) == null ? void 0 : c.open) ?? !1,
        enter: "transition transform ease-in-out duration-300",
        "enter-from": "opacity-0 scale-95",
        "enter-to": "opacity-100 scale-100",
        leave: "transition transform ease-in-out duration-300",
        "leave-from": "opacity-100 scale-100",
        "leave-to": "opacity-0 scale-95"
      }, {
        default: Y(() => {
          var l, u;
          return [
            fe(A(bo), {
              "data-inertiaui-modal-id": (l = A(n)) == null ? void 0 : l.id,
              "data-inertiaui-modal-index": (u = A(n)) == null ? void 0 : u.index,
              class: "im-dialog relative z-20",
              onClose: o
            }, {
              default: Y(() => {
                var p, v, g;
                return [
                  ((p = A(n)) == null ? void 0 : p.index) === 0 ? (U(), Ee(A(tt), {
                    key: 0,
                    as: "template",
                    enter: "transition transform ease-in-out duration-300",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "transition transform ease-in-out duration-300",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: Y(() => {
                      var f;
                      return [
                        gn(xe("div", ma, null, 512), [
                          [yn, (f = A(n)) == null ? void 0 : f.onTopOfStack]
                        ])
                      ];
                    }),
                    _: 1
                  })) : Fe("", !0),
                  ((v = A(n)) == null ? void 0 : v.index) > 0 && ((g = A(n)) != null && g.onTopOfStack) ? (U(), he("div", ha)) : Fe("", !0),
                  De(a.$slots, "default", {
                    modalContext: A(n),
                    modalProps: r.value
                  })
                ];
              }),
              _: 3
            }, 8, ["data-inertiaui-modal-id", "data-inertiaui-modal-index"])
          ];
        }),
        _: 3
      }, 8, ["show"]);
    };
  }
}, ga = { class: "im-slideover-container fixed inset-0 z-40 overflow-y-auto overflow-x-hidden" }, ya = {
  key: 0,
  class: "absolute right-0 top-0 pr-3 pt-3"
}, wa = {
  __name: "SlideoverContent",
  props: {
    modalContext: Object,
    modalProps: Object
  },
  setup(e) {
    return (t, n) => (U(), he("div", ga, [
      xe("div", {
        class: de(["im-slideover-positioner flex min-h-full items-center", {
          "justify-start": e.modalProps.position === "left",
          "justify-end": e.modalProps.position === "right"
        }])
      }, [
        fe(A(tt), {
          "enter-from": "opacity-0 " + (e.modalProps.position === "left" ? "-translate-x-full" : "translate-x-full"),
          "enter-to": "opacity-100 translate-x-0",
          "leave-from": "opacity-100 translate-x-0",
          "leave-to": "opacity-0 " + (e.modalProps.position === "left" ? "-translate-x-full" : "translate-x-full"),
          class: de({
            "im-slideover-wrapper w-full transition duration-300 ease-in-out": !0,
            "blur-sm": !e.modalContext.onTopOfStack,
            "sm:max-w-sm": e.modalProps.maxWidth == "sm",
            "sm:max-w-md": e.modalProps.maxWidth == "md",
            "sm:max-w-md md:max-w-lg": e.modalProps.maxWidth == "lg",
            "sm:max-w-md md:max-w-xl": e.modalProps.maxWidth == "xl",
            "sm:max-w-md md:max-w-xl lg:max-w-2xl": e.modalProps.maxWidth == "2xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl": e.modalProps.maxWidth == "3xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl": e.modalProps.maxWidth == "4xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl": e.modalProps.maxWidth == "5xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl": e.modalProps.maxWidth == "6xl",
            "sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl": e.modalProps.maxWidth == "7xl"
          }),
          onAfterLeave: e.modalContext.afterLeave
        }, {
          default: Y(() => [
            fe(A(Mn), {
              class: de(["im-slideover-content relative", [e.modalProps.paddingClasses, e.modalProps.panelClasses]])
            }, {
              default: Y(() => [
                e.modalProps.closeButton ? (U(), he("div", ya, [
                  fe(qn, {
                    onClick: e.modalContext.close
                  }, null, 8, ["onClick"])
                ])) : Fe("", !0),
                De(t.$slots, "default", {
                  modalContext: e.modalContext,
                  modalProps: e.modalProps
                })
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 8, ["enter-from", "leave-to", "class", "onAfterLeave"])
      ], 2)
    ]));
  }
}, Pa = {
  __name: "Modal",
  props: {
    name: {
      type: String,
      required: !1
    }
  },
  emits: ["emit"],
  setup(e, { expose: t, emit: n }) {
    const r = e, o = hr(), s = r.name ? b({}) : $("modalContext");
    r.name && (o.registerLocalModal(r.name, function(c) {
      s.value = c;
    }), z("modalContext", s), Or(() => {
      o.removeLocalModal(r.name);
    }));
    const a = n;
    function i(c, ...l) {
      a("emit", c, ...l);
    }
    return t({
      close: s.value.close,
      emit: i,
      getChildModal: s.value.getChildModal,
      getParentModal: s.value.getParentModal,
      modalContext: s.value,
      reload: s.value.reload
    }), (c, l) => (U(), Ee(va, null, {
      default: Y(({ modalContext: u, modalProps: p }) => [
        (U(), Ee(wn(p.slideover ? wa : ko), {
          "modal-context": u,
          "modal-props": p
        }, {
          default: Y(() => [
            De(c.$slots, "default", {
              close: u.close,
              emit: i,
              getChildModal: u.getChildModal,
              getParentModal: u.getParentModal,
              modalContext: u,
              modalProps: p,
              reload: u.reload
            })
          ]),
          _: 2
        }, 1032, ["modal-context", "modal-props"]))
      ]),
      _: 3
    }));
  }
}, Ca = {
  __name: "ModalLink",
  props: {
    href: {
      type: String,
      required: !0
    },
    as: {
      type: String,
      default: "a"
    },
    fragment: {
      type: String,
      required: !1,
      default: null
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    // Passthrough to Modal.vue
    closeButton: {
      type: Boolean,
      required: !1,
      default: null
    },
    closeExplicitly: {
      type: Boolean,
      required: !1,
      default: null
    },
    maxWidth: {
      type: String,
      required: !1,
      default: null
    },
    paddingClasses: {
      type: [Boolean, String],
      required: !1,
      default: null
    },
    panelClasses: {
      type: [Boolean, String],
      required: !1,
      default: null
    },
    position: {
      type: String,
      required: !1,
      default: null
    },
    slideover: {
      type: Boolean,
      required: !1,
      default: null
    },
    method: {
      type: String,
      required: !1,
      default: "get"
    },
    data: {
      type: Object,
      required: !1,
      default: () => {
      }
    }
  },
  emits: ["after-leave", "blur", "close", "error", "focus", "start", "success"],
  setup(e, { expose: t, emit: n }) {
    const r = e, o = b(!1), s = hr(), a = b(null);
    z("modalContext", a);
    const i = n, c = b(!1);
    ae(
      () => {
        var f;
        return (f = a.value) == null ? void 0 : f.isOnTopOfStack();
      },
      (f) => {
        a.value && (f && c.value ? i("focus") : f || i("blur"), c.value = !f);
      }
    ), F(() => {
      r.fragment && window.location.hash === `#${r.fragment}` && g();
    });
    const l = vn();
    function u(f, ...h) {
      const m = f.replace(/-([a-z])/g, (x) => x[1].toUpperCase()), w = `on${m.charAt(0).toUpperCase()}${m.slice(1)}`;
      w in l && l[w](...h);
    }
    ae(a, (f, h) => {
      f && !h && (r.fragment && a.value.index === 0 && (window.location.hash = r.fragment), hn(() => {
        a.value.open = !0, i("success");
      }));
    });
    function p() {
      r.fragment && a.value.index === 0 && (window.location.hash = ""), i("close");
    }
    function v() {
      a.value = null, i("after-leave");
    }
    function g(f = {}) {
      if (o.value)
        return;
      const h = { ...r, ...f }, m = da(qt(r, mr));
      if (h.href.startsWith("#")) {
        a.value = s.callLocalModal(h.href.substring(1), m, p, v);
        return;
      }
      o.value = !0, i("start"), P({
        method: h.method,
        url: h.href,
        data: h.data,
        headers: {
          ...h.headers,
          Accept: "text/html, application/xhtml+xml",
          "X-Requested-With": "XMLHttpRequest",
          "X-Inertia": !0,
          "X-Inertia-Version": Cr().version,
          "X-InertiaUI-Modal": !0
        }
      }).then((w) => {
        Rr.resolveComponent(w.data.component).then((x) => {
          a.value = s.push(Tr(x), w.data, m, p, v);
        });
      }).catch((w) => {
        i("error", w);
      }).finally(() => {
        o.value = !1;
      });
    }
    return t({ handle: g }), (f, h) => {
      var m;
      return U(), he(Nt, null, [
        (U(), Ee(wn(e.as), Kt(A(l), {
          href: e.href,
          method: e.method,
          data: e.data,
          onClick: Pr(g, ["prevent"])
        }), {
          default: Y(() => [
            De(f.$slots, "default", { loading: o.value })
          ]),
          _: 3
        }, 16, ["href", "method", "data"])),
        (m = a.value) != null && m.component ? gn((U(), Ee(A(a).component, Kt({ key: 0 }, a.value.componentProps, { onEmit: u }), null, 16)), [
          [yn, !1]
        ]) : Fe("", !0)
      ], 64);
    };
  }
};
export {
  Pa as Modal,
  Ca as ModalLink,
  Lr as getConfig,
  Oa as putConfig,
  Sa as resetConfig
};
