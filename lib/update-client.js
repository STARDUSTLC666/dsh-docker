// Generated: shared optional update controls; edit the original client templates.
(function(){
/* DSH workbench UI v1. MIT. Canonical source: dsh-suite/ui/workbench-ui.js.
 * Vendored into each plugin: no Suite or extra runtime dependency is required.
 * Styles are scoped to .dshw and never replace the host chrome or theme.
 */
function createWorkbenchUI(React) {
  const h = React.createElement;
  const { useEffect, useId, useRef } = React;
  const cx = (...values) => values.filter(Boolean).join(' ');
  const paths = {
    book: ['M4 4h6a3 3 0 0 1 2 2v15a4 4 0 0 0-4-2H4z', 'M20 4h-6a3 3 0 0 0-2 2v15a4 4 0 0 1 4-2h4z'],
    calendar: ['M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z', 'M7 3v4M17 3v4M3 10h18'],
    mail: ['M3 5h18v14H3z', 'm3 6 9 7 9-7'],
    rss: ['M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16', 'M4 19h.01'],
    slides: ['M3 4h18v13H3z', 'M12 17v4M8 21h8'],
    shield: ['m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6z', 'm8 12 3 3 5-6'],
    layers: ['M5 3h16v16H5z', 'M2 7v15h15'],
    play: ['m9 6 9 6-9 6Z'],
    video: ['M3 5h12v14H3z', 'm15 10 6-4v12l-6-4'],
    search: ['M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z', 'm16 16 5 5'],
    plus: ['M12 5v14M5 12h14'],
    refresh: ['M20 7a9 9 0 1 0 1 8', 'M20 2v5h-5'],
    settings: ['m9 3-.7 2.4-2 .9L4 5.8 2.5 8.4l1.7 1.8v2.3L2.5 14 4 17l2.5-.4 1.9 1L9 20h3l.8-2.4 2-1 2.5.4 1.5-2.7-1.7-1.9v-2.2l1.7-1.8-1.5-2.6-2.5.4-2-1L12 3Z', 'M14 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'],
    close: ['m6 6 12 12M18 6 6 18'],
    left: ['m14 5-7 7 7 7'],
    right: ['m10 5 7 7-7 7'],
    down: ['m5 9 7 7 7-7'],
    filter: ['M4 5h16M7 12h10M10 19h4'],
    download: ['M12 3v12m-5-5 5 5 5-5', 'M4 16v5h16v-5'],
    upload: ['M12 16V4m-5 5 5-5 5 5', 'M4 16v5h16v-5'],
    copy: ['M8 8h13v13H8z', 'M16 8V3H3v13h5'],
    external: ['M14 3h7v7m0-7L10 14', 'M10 3H3v18h18v-7'],
    file: ['M4 3h10l6 6v12H4z', 'M14 3v6h6M8 13h8M8 17h6'],
    folder: ['M3 5h7l2 3h9v12H3z'],
    edit: ['m15 4 5 5-10 10-6 1 1-6Z', 'm13 6 5 5'],
    trash: ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7'],
    more: ['M5 12h.01M12 12h.01M19 12h.01'],
    info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 11v6M12 7h.01'],
    check: ['m5 12 4 4L19 6'],
    quote: ['M4 12h6v7H3v-7c0-4 2-6 5-7M15 12h6v7h-7v-7c0-4 2-6 5-7'],
    star: ['m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z'],
    reply: ['m9 5-7 7 7 7v-5h6c3 0 5 2 6 5 0-8-4-11-12-11Z'],
    link: ['m10 13 4-4M8 16l-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0', 'm14 8 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0'],
  };
  function Icon({ name = 'file', size = 20, ...props }) {
    return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false, ...props },
      (paths[name] || paths.file).map((d, index) => h('path', { key: index, d })));
  }
  function Button({ children, icon, variant, className, ...props }) {
    return h('button', { type: 'button', ...props, className: cx('w-button', variant && 'w-' + variant, className) }, icon ? h(Icon, { name: icon, size: 18 }) : null, children);
  }
  function IconButton({ label, icon, ...props }) {
    return h(Button, { ...props, icon, className: cx('w-icon-button', props.className), 'aria-label': label, title: label });
  }
  function Page({ title, subtitle, actions, children, workbench = false, className, rootRef, ...props }) {
    return h('section', { ...props, ref: rootRef, className: cx('dshw', 'w-page', className), 'data-main': workbench ? 'true' : 'false' },
      h(Styles, { key: 'styles' }),
      h('header', { className: 'w-page-header' }, h('div', { className: 'w-heading' }, h('h1', null, title), subtitle ? h('p', { className: 'w-subtitle' }, subtitle) : null), actions ? h('div', { className: 'w-header-actions' }, actions) : null),
      h('div', { className: 'w-body' }, children));
  }
  function Tabs({ items, value, onChange, label, children }) {
    const id = useId();
    const active = items.some(item => item.id === value) ? value : items[0]?.id;
    function keys(event, index) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
      const node = event.currentTarget.parentElement?.querySelectorAll('[role=tab]')[next];
      if (node) { onChange(items[next].id); node.focus(); }
    }
    return h('div', { className: 'w-tabs-layout' },
      h('div', { className: 'w-tabs', role: 'tablist', 'aria-label': label }, items.map((item, index) => h('button', {
        type: 'button', role: 'tab', key: item.id, id: id + '-' + item.id, 'aria-controls': id + '-panel', 'aria-selected': active === item.id, tabIndex: active === item.id ? 0 : -1,
        onClick: () => onChange(item.id), onKeyDown: event => keys(event, index),
      }, item.label, item.count !== undefined ? h('span', { className: 'w-count' }, item.count) : null))),
      h('div', { className: 'w-tab-panel', id: id + '-panel', role: 'tabpanel', 'aria-labelledby': id + '-' + active }, children));
  }
  function Status({ children, tone = 'info', className }) {
    if (!children) return null;
    return h('div', { className: cx('dshw', 'w-status', 'w-status-' + tone, className), role: tone === 'error' ? 'alert' : 'status', 'aria-live': tone === 'error' ? 'assertive' : 'polite' }, h(Icon, { name: tone === 'success' ? 'check' : 'info', size: 18 }), h('div', null, children));
  }
  function Empty({ title, children, action, icon = 'file' }) {
    return h('div', { className: 'dshw w-empty' }, h(Styles, { key: 'styles' }), h(Icon, { name: icon, size: 32 }), h('h2', null, title), children ? h('div', { className: 'w-muted' }, children) : null, action ? h('div', { className: 'w-toolbar' }, action) : null);
  }
  function Split({ list, detail, selected, onBack, backLabel, className, listWidth = 360 }) {
    const ref = useRef(null);
    useEffect(() => {
      if (!selected || !ref.current || ref.current.clientWidth > 760) return;
      const heading = ref.current.querySelector('.w-detail h2');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    }, [selected]);
    return h('div', { ref, className: cx('w-split', className), 'data-selected': selected ? 'true' : 'false', style: { '--w-list-width': listWidth + 'px' } },
      h('div', { className: 'w-master' }, list),
      h('div', { className: 'w-detail' }, selected ? h(Button, { className: 'w-back', icon: 'left', variant: 'ghost', onClick: onBack }, backLabel) : null, detail));
  }
  function Row({ title, meta, description, active, onClick, children, status, className, disabled }) {
    return h('div', { className: cx('w-row', active && 'w-selected', className) },
      children ? h('div', { className: 'w-row-select' }, children) : null,
      h('button', { type: 'button', className: 'w-row-button', onClick, disabled, 'aria-pressed': !!active },
        h('span', { className: 'w-row-head' }, h('strong', null, title), status ? h('span', { className: 'w-tag' }, status) : null),
        meta ? h('span', { className: 'w-row-meta' }, meta) : null,
        description ? h('span', { className: 'w-row-description' }, description) : null));
  }
  function Search({ label, value, onChange, ...props }) {
    const id = useId();
    return h('div', { className: 'w-search' }, h(Icon, { name: 'search', size: 18 }), h('input', { type: 'search', id, 'aria-label': label, placeholder: label, value, onChange, ...props }));
  }
  function Switch({ label, checked, onChange, disabled }) {
    return h('label', { className: 'w-switch-label' }, h('span', null, label), h('input', { type: 'checkbox', role: 'switch', checked, disabled, onChange, 'aria-label': label }), h('span', { className: 'w-switch-track', 'aria-hidden': true }));
  }
  function Dialog({ title, children, onClose, closeLabel, className, busy = false }) {
    const id = useId(), panel = useRef(null);
    useEffect(() => {
      const previous = document.activeElement;
      panel.current?.querySelector('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')?.focus();
      return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); };
    }, []);
    function keydown(event) {
      if (event.key === 'Escape' && !event.isComposing) { event.preventDefault(); event.stopPropagation(); if (!busy) onClose(); return; }
      if (event.key !== 'Tab') return;
      const controls = [...panel.current.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]')].filter(node => node.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (!controls.length) { event.preventDefault(); panel.current.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    return h('div', { className: 'dshw w-overlay', onClick: event => { if (!busy && event.target === event.currentTarget) onClose(); } },
      h(Styles, { key: 'styles' }),
      h('section', { ref: panel, className: cx('w-dialog', className), role: 'dialog', 'aria-modal': true, 'aria-labelledby': id, tabIndex: -1, onKeyDown: keydown },
        h('header', { className: 'w-dialog-header' }, h('h2', { id }, title), h(IconButton, { icon: 'close', label: closeLabel, disabled: busy, onClick: onClose })), h('div', { className: 'w-dialog-body' }, children)));
  }
  function register(ctx, { id, label, icon, component, inject, order = 50 }) {
    // The two slots are optional. Existing settings and manual tools still load
    // in hosts without a workbench, while RC.3 owns navigation/pinning itself.
    ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, inject: () => ({ ...(inject?.() || {}), workbench: true }) }, component));
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order, label }, function WorkbenchIcon({ size }) { return h(Icon, { name: icon, size }); }));
  }
  const styles = `
.dshw{--w-bg:var(--dsw-alias-bg-layer-1,#fff);--w-soft:var(--dsw-alias-bg-layer-2,#f7f8fa);--w-text:var(--dsw-alias-label-primary,#18202c);--w-muted:var(--dsw-alias-label-secondary,#667085);--w-border:var(--dsw-alias-border-l3,#e7e9ef);--w-accent:var(--dsh-plugin-workbench-accent,#4f6bdb);--w-selected:color-mix(in srgb,var(--w-accent) 10%,var(--w-bg));--w-primary:var(--w-text);--w-on-primary:var(--w-bg);container-type:inline-size;container-name:dsh-workbench;color:var(--w-text);font:14px/1.65 var(--dsh-font-family-content,system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif);min-width:0;max-width:100%;box-sizing:border-box;text-align:start;color-scheme:inherit}
.dshw *,.dshw *:before,.dshw *:after{box-sizing:border-box}.dshw h1,.dshw h2,.dshw h3,.dshw h4,.dshw p{margin:0}.dshw h1{font-size:30px;line-height:1.25;letter-spacing:-.025em;font-weight:650}.dshw h2{font-size:24px;line-height:1.35;font-weight:650;letter-spacing:-.015em;overflow-wrap:anywhere}.dshw h3,.dshw h4{font-size:16px;line-height:1.4;font-weight:600}.dshw a{color:var(--w-accent);text-underline-offset:3px;overflow-wrap:anywhere}.dshw button,.dshw input,.dshw select,.dshw textarea{font:inherit;color:inherit;max-width:100%}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select,.dshw textarea{background:var(--dsw-specific-input-major,var(--w-bg));border:1px solid var(--w-border);border-radius:8px;padding:8px 11px;min-width:0;line-height:1.5}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select{min-height:38px}.dshw textarea{resize:vertical}.dshw input[type=checkbox],.dshw input[type=radio]{width:16px;height:16px;flex-shrink:0;accent-color:var(--w-accent)}.dshw :focus-visible{outline:2px solid var(--w-accent);outline-offset:3px}.dshw button:disabled,.dshw input:disabled,.dshw select:disabled,.dshw textarea:disabled{opacity:.5;cursor:not-allowed}.dshw label{font-size:13px}.dshw fieldset{min-width:0;border:1px solid var(--w-border);border-radius:8px}.dshw summary{cursor:pointer;font-weight:550;list-style:none;display:flex;align-items:center;gap:8px}.dshw summary::-webkit-details-marker{display:none}.dshw summary:after{content:'';display:block;margin-inline-start:auto;width:7px;height:7px;border-inline-end:1.75px solid currentColor;border-bottom:1.75px solid currentColor;transform:rotate(45deg);flex-shrink:0}.dshw details[open]>summary:after{transform:rotate(225deg)}.dshw details>summary+*{margin-top:12px}.dshw pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace;max-width:100%;background:var(--w-soft);border-radius:6px;padding:14px}.dshw img,.dshw video,.dshw iframe{max-width:100%}
.w-page{display:flex;flex-direction:column;position:relative;padding:0;min-height:540px;gap:0}.w-page[data-main=true]{height:100%;min-height:0;padding:calc(24px + var(--dsh-frame-top-clearance,0px)) 28px 0 max(28px,var(--dsh-frame-leading-clearance,0px));overflow:auto}.dshw[data-main=true]{background:var(--w-bg)}.dshw.w-page,.dshw .w-body,.dshw .w-tab-panel{overflow-x:clip}.w-page-header{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;padding-bottom:22px;flex-shrink:0}.w-heading{min-width:0}.w-subtitle{margin-top:8px!important;font-size:14px;color:var(--w-muted);line-height:1.6}.w-header-actions,.w-toolbar,.w-actions{display:flex;align-items:center;flex-wrap:wrap;gap:8px;min-width:0}.w-header-actions{justify-content:flex-end}.w-body,.w-tabs-layout{display:flex;flex-direction:column;flex:1;min-height:0;min-width:0}.w-body{overflow:auto}.w-tab-panel{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;overflow:auto}.w-tabs{display:flex;align-items:stretch;gap:20px;border-bottom:1px solid var(--w-border);flex-shrink:0;overflow-x:auto;scrollbar-width:thin}.dshw .w-tabs>button{border:0;border-bottom:2px solid transparent;background:transparent;padding:11px 8px 13px;white-space:nowrap;font-size:14px;font-weight:550;cursor:pointer;color:var(--w-muted);display:flex;align-items:center;gap:7px}.dshw .w-tabs>button[aria-selected=true]{border-bottom-color:var(--w-accent);color:var(--w-accent)}.w-count,.w-tag{font-size:12px;line-height:1.5;display:inline-flex;align-items:center;flex-shrink:0;background:var(--w-soft);border-radius:5px;padding:1px 6px;color:var(--w-muted)}.w-tabs [aria-selected=true] .w-count,.w-selected .w-tag{color:var(--w-accent);background:var(--w-selected)}
.dshw .w-button{display:inline-flex;justify-content:center;align-items:center;gap:7px;background:var(--w-bg);border:1px solid var(--w-border);border-radius:8px;padding:8px 12px;min-height:36px;line-height:1.4;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;white-space:normal}.dshw .w-button:not(:disabled):hover{background:var(--w-soft)}.dshw .w-primary{background:var(--w-primary);border-color:var(--w-primary);color:var(--w-on-primary)}.dshw .w-primary:not(:disabled):hover{background:var(--w-primary);opacity:.9}.dshw .w-ghost{background:transparent;border-color:transparent}.dshw .w-danger{color:var(--dsw-alias-state-error-primary,#b43c3c)}.dshw .w-icon-button{width:36px;min-width:36px;padding:8px}.dshw .w-button svg{flex-shrink:0}.w-muted{color:var(--w-muted);font-size:12px;line-height:1.6}.w-section{padding:24px 0;border-bottom:1px solid var(--w-border);min-width:0}.w-section>h3{margin-bottom:12px}.w-section>p+p{margin-top:8px}.w-fields{display:grid;gap:16px;min-width:0}.w-field{display:grid;gap:6px;min-width:0}.w-field>input,.w-field>select,.w-field>textarea{width:100%}.w-status{display:flex;align-items:flex-start;gap:8px;padding:11px 13px;margin:12px 0;border:1px solid var(--w-border);border-radius:8px;background:var(--w-soft);font-size:13px;overflow-wrap:anywhere;flex-shrink:0}.w-status>svg{flex-shrink:0;margin-top:2px}.w-status-error{color:var(--dsw-alias-state-error-primary,#ad3636)}.w-status-success{color:var(--dsw-alias-state-success-primary,#24794a)}.w-status-warn{color:var(--dsw-alias-state-warning-primary,#8a5a00)}.w-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px;width:100%;max-width:580px;padding:48px 24px;margin:auto;min-height:280px;overflow-wrap:anywhere}.w-empty>svg{color:var(--w-muted)}.w-empty h2{font-size:20px}.w-empty .w-muted{font-size:14px}.w-empty .w-toolbar{justify-content:center}
.w-split{display:grid;grid-template-columns:minmax(240px,var(--w-list-width)) minmax(0,1fr);min-height:460px;flex:1;min-width:0}.w-master{min-width:0;border-inline-end:1px solid var(--w-border);overflow:auto;padding-bottom:24px}.w-detail{min-width:0;padding:26px 28px;overflow:auto;overflow-wrap:anywhere;display:flex;flex-direction:column}.w-master-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:20px 16px}.w-search{display:flex;align-items:center;gap:8px;border:1px solid var(--w-border);border-radius:8px;padding:0 10px;min-width:0;flex:1;background:var(--w-bg)}.w-search>svg{color:var(--w-muted);flex-shrink:0}.dshw .w-search>input{border:0!important;background:transparent!important;padding:8px 0!important;width:100%;outline-offset:0}.w-row{display:flex;gap:0;min-width:0;position:relative;border-bottom:1px solid var(--w-border);border-inline-start:3px solid transparent}.w-row-select{display:flex;align-items:flex-start;padding:21px 0 0 14px}.dshw .w-row-button{display:flex;flex-direction:column;align-items:stretch;gap:7px;text-align:start;width:100%;padding:18px 18px 18px 16px;border:0;background:transparent;color:inherit;min-width:0;cursor:pointer;line-height:1.5}.dshw .w-row-button:hover{background:var(--w-soft)}.w-row-head{display:flex;align-items:flex-start;gap:10px;justify-content:space-between;min-width:0}.w-row-head>strong{font-size:14px;line-height:1.5;font-weight:600;overflow-wrap:anywhere}.w-row-meta,.w-row-description{color:var(--w-muted);font-size:12px;line-height:1.6;overflow-wrap:anywhere}.w-row-description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.w-selected{background:var(--w-selected);border-inline-start-color:var(--w-accent)}.w-back{display:none!important}.w-detail-title{margin-bottom:12px!important}.w-detail-meta{color:var(--w-muted);font-size:13px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}.w-detail-footer{padding:24px 0;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:auto;border-top:1px solid var(--w-border)}.w-detail-footer .w-muted{flex:1;min-width:160px}.w-definition{display:grid;grid-template-columns:minmax(80px,120px) minmax(0,1fr);gap:8px 16px;font-size:14px;margin:20px 0}.w-definition dt{color:var(--w-muted)}.w-definition dd{margin:0;min-width:0;overflow-wrap:anywhere}
.w-switch-label{display:inline-flex;align-items:center;gap:8px;font-size:13px;position:relative;cursor:pointer}.w-switch-label>input{position:absolute;opacity:0;inset-inline-end:0;width:36px!important;height:22px!important;margin:0;cursor:pointer}.w-switch-track{width:36px;height:22px;border-radius:12px;display:block;background:var(--w-border);border:1px solid var(--w-border);pointer-events:none;padding:2px;transition:background .15s}.w-switch-track:before{content:'';display:block;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 2px #0002;transition:transform .15s}.w-switch-label>input:checked+.w-switch-track{background:var(--w-accent);border-color:var(--w-accent)}.w-switch-label>input:checked+.w-switch-track:before{transform:translateX(14px)}.w-switch-label>input:focus-visible+.w-switch-track{outline:2px solid var(--w-accent);outline-offset:3px}.w-switch-label:has(>input:disabled){opacity:.5;cursor:not-allowed}
.w-overlay{position:fixed;inset:0;background:#0005;display:flex;justify-content:flex-end;z-index:1000;padding:12px;overflow:auto}.w-dialog{width:min(620px,100%);max-height:100%;display:flex;flex-direction:column;min-height:0;background:var(--w-bg);color:var(--w-text);border:1px solid var(--w-border);border-radius:12px;box-shadow:0 18px 70px #0003}.w-dialog-header{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;border-bottom:1px solid var(--w-border);flex-shrink:0}.w-dialog-header>h2{font-size:20px}.w-dialog-body{overflow:auto;padding:20px 24px;min-height:0}.w-editor-grid{display:grid;grid-template-columns:210px minmax(0,1fr) 300px;min-height:500px;flex:1}.w-editor-list{padding:20px 12px;border-inline-end:1px solid var(--w-border);min-width:0}.w-editor-canvas{background:var(--w-soft);padding:20px;min-width:0;display:flex;flex-direction:column;gap:14px}.w-editor-inspector{padding:24px;border-inline-start:1px solid var(--w-border);min-width:0;overflow:auto}.w-editor-inspector h3{margin-bottom:18px}.w-preview-empty{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;aspect-ratio:16/9;min-height:180px;background:var(--w-soft);border:1px solid var(--w-border);border-radius:8px;padding:24px;color:var(--w-muted)}.w-content-pad{padding:24px 0}.w-stack{display:flex;flex-direction:column;gap:16px;min-width:0}.w-scroll-x{overflow:auto;max-width:100%}
@container dsh-workbench (max-width:1000px){.w-editor-grid{grid-template-columns:160px minmax(0,1fr)}.w-editor-inspector{grid-column:1/-1;border-inline-start:0;border-top:1px solid var(--w-border)}.w-header-actions{max-width:60%}.w-split{grid-template-columns:minmax(240px,32%) minmax(0,1fr)}}
@container dsh-workbench (max-width:760px){.w-page-header{gap:14px;flex-wrap:wrap;padding-bottom:18px}.w-heading{flex:1;min-width:170px}.dshw h1{font-size:24px}.w-header-actions{max-width:100%;justify-content:flex-start}.w-subtitle{font-size:13px}.w-tabs{gap:12px}.dshw .w-tabs>button{padding:10px 4px 12px}.w-split{display:block;min-height:360px}.w-split[data-selected=false]>.w-detail{display:none}.w-split[data-selected=true]>.w-master{display:none}.w-master{border-inline-end:0}.w-detail{padding:20px 0}.w-back{display:inline-flex!important;align-self:flex-start;margin:0 0 16px!important}.w-detail h2{font-size:22px}.w-master-toolbar{padding:16px 0}.dshw .w-row-button{padding:16px 10px}.w-detail-footer{position:static}.w-detail-footer .w-muted{flex-basis:100%}.w-editor-grid{display:flex;flex-direction:column}.w-editor-list{border-inline-end:0;border-bottom:1px solid var(--w-border);padding:16px 0}.w-editor-canvas{padding:16px 0;background:var(--w-bg)}.w-editor-inspector{padding:20px 0}.w-dialog-header,.w-dialog-body{padding:16px}.w-button{min-height:40px}.w-definition{grid-template-columns:80px minmax(0,1fr)}}
@media(max-width:700px){.w-page[data-main=true]{padding:calc(16px + var(--dsh-frame-top-clearance,0px)) 16px 0 max(16px,var(--dsh-frame-leading-clearance,0px))}.w-overlay{padding:8px}.w-dialog{width:100%}}
@media(prefers-reduced-motion:reduce){.dshw *,.dshw *:before{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
`;
  function Styles() { return h('style', null, styles); }
  return { Icon, Button, IconButton, Page, Tabs, Status, Empty, Split, Row, Search, Switch, Dialog, Styles, register, styles };
}

/* One update control per plugin. Only transport, idle guards and installation
 * coordination are shared; no global update page or update-all action exists. */
function __stardustUpdatesGuards() {
  const key = Symbol.for('stardustlc.plugin-updates.guards.v1');
  return globalThis[key] ||= { values: new Map(), listeners: new Set(), viewListeners: new Set(), clients: new Set() };
}
function __stardustUpdatesGuard(React, name, { dirty = false, busy = false, retainOnClose = false } = {}) {
  const token = React.useRef(null);
  if (!token.current) token.current = {};
  React.useLayoutEffect(() => {
    const pool = __stardustUpdatesGuards();
    if (!dirty && !busy) for (const [key, value] of pool.values) if (value.name === name && value.orphan) pool.values.delete(key);
    pool.values.set(token.current, { name, dirty: !!dirty, busy: !!busy, retainOnClose, orphan: false });
    for (const listener of pool.listeners) listener();
  }, [name, !!dirty, !!busy, retainOnClose]);
  React.useEffect(() => () => {
    const pool = __stardustUpdatesGuards(), value = pool.values.get(token.current);
    if (value?.retainOnClose && (value.dirty || value.busy)) value.orphan = true;
    else pool.values.delete(token.current);
    for (const listener of pool.listeners) listener();
  }, []);
}
function __StardustPluginUpdatesFooter({ React, name }) {
  const [, render] = React.useState(0), pool = __stardustUpdatesGuards();
  React.useEffect(() => { const fn = () => render(value => value + 1); pool.viewListeners.add(fn); return () => pool.viewListeners.delete(fn); }, []);
  const client = [...pool.clients].find(client => typeof client.Footer === 'function' && client.has(name));
  if (!client) return null;
  return React.createElement(client.Footer, { name });
}
function __stardustUpdatesFooter(React, name) {
  return React.createElement(__StardustPluginUpdatesFooter, { key: 'plugin-updates', React, name });
}
function __stardustUpdatesInlinePage(React, element, name) {
  return React.cloneElement(element, null, element.props.children, __stardustUpdatesFooter(React, name));
}
function __stardustUpdatesDetailName(subject, rows) {
  if (!subject || !['bundle', 'row'].includes(subject.kind)) return null;
  if (subject.kind === 'row' && subject.pkg?.name === '@stardustlc/dsh-suite') {
    const component = rows.find(row => row.bundledBy === subject.pkg.name && (subject.row?.moduleName === row.name || subject.row?.moduleName?.startsWith(row.name + '/')));
    if (component) return component.name;
  }
  return rows.some(row => row.name === subject.pkg?.name) ? subject.pkg.name : null;
}
function __stardustUpdatesNativeFormState(document) {
  let dirty = false, busy = false;
  for (const scope of document.querySelectorAll('[data-plugin-detail],[data-plugin-row-detail]')) for (const button of scope.querySelectorAll('button')) {
    if (!button.getClientRects().length || button.closest('.plugin-updates-footer')) continue;
    const label = (button.getAttribute('aria-label') || button.textContent || '').trim();
    if (/^(?:正在保存|保存中|Saving)(?:[.…\s]|$)/i.test(label) || button.getAttribute('aria-busy') === 'true') busy = true;
    if (!button.disabled && button.getAttribute('aria-disabled') !== 'true' && /^(?:保存(?:更改|设置|配置)?|Save(?: changes| settings| configuration)?)(?:\s+(?:Ctrl|⌘|Enter|↵).*)?$/i.test(label)) dirty = true;
  }
  return { dirty, busy };
}
function __stardustUpdatesDisplayRows(next, known) {
  for (const row of next.rows) known.set(row.name, row);
  if (!['verifying', 'installing', 'cancelling', 'unknown', 'restore-failed'].includes(next.job?.state)) return next;
  const rows = [...next.rows];
  for (const row of known.values()) if ((row.name === next.job.name || row.bundledBy === next.job.name) && !rows.some(item => item.name === row.name)) rows.push({ ...row, updating: true });
  return { ...next, rows };
}
function __stardustUpdatesSuiteRows(next, participants) {
  // The official manager lists top-level dependencies, not Suite's transitive
  // components. Project active, build-identified clients for display only.
  // Installation and preferences still use the real Suite row from the host.
  const suiteUpdating = next.job?.name === '@stardustlc/dsh-suite' && ['verifying', 'installing', 'cancelling', 'unknown', 'restore-failed'].includes(next.job?.state);
  const suite = next.rows.find(row => row.name === '@stardustlc/dsh-suite' && (row.enabled || suiteUpdating));
  if (!suite) return next;
  const rows = [...next.rows], names = new Set(rows.map(row => row.name));
  for (const item of participants) if (item.suiteComponent && item.packageVersion && item.label && !names.has(item.name)) {
    names.add(item.name);
    rows.push({ name: item.name, version: item.packageVersion, enabled: true, sourceKind: 'suite', loadError: false, label: item.label, labelEn: item.labelEn, bundledBy: suite.name });
  }
  return { ...next, rows };
}
function __stardustUpdatesWrap(definition, participant) {
  return { ...definition, factory(require) {
    const original = definition.factory(require);
    if (!original || typeof original !== 'object') return original;
    const React = require('react');
    return { ...original, apply(ctx, ...args) {
      const result = original.apply?.call(this, ctx, ...args);
      // The optional alpha.3 slot stays dormant in older hosts; its scoped
      // injection unregisters naturally when the plugin is unloaded.
      if (participant.iconData && participant.sectionIds?.length && typeof ctx.inject === 'function') ctx.inject(['slots'], host => {
        for (const id of new Set(participant.sectionIds)) host.slots.inject('settings.section.icon', () => host.slots.register({ name: 'settings.section.icon', id }, function PluginSettingsIcon({ size = 20 }) {
          return React.createElement('img', { src: participant.iconData, alt: '', 'aria-hidden': true, width: size, height: size, style: { objectFit: 'contain', display: 'block', flexShrink: 0 } });
        }));
      });
      if (typeof ctx.inject === 'function') ctx.inject(['slots', 'locale', 'remote', 'remote.pluginManager'], host => __stardustUpdatesJoin(host, React, require, participant));
      return result;
    } };
  } };
}
function __stardustUpdatesJoin(host, React, require, participant) {
  const key = Symbol.for('stardustlc.plugin-updates.client.v1'), pools = globalThis[key] ||= new WeakMap(), root = host.root || host;
  if (typeof root.plugin !== 'function') return;
  let record = pools.get(root);
  if (!record) {
    record = { refs: new Map(), timer: null, version: participant.version, alive: true, hold: false, uiRevision: 11, migration: Promise.resolve() };
    pools.set(root, record);
    __stardustUpdatesActivate(record, pools, root, React, require);
  } else if ((record.uiRevision || 0) < 11 && !record.upgrading) {
    // An earlier loaded participant may still own an older client revision. Keep
    // its references and draft guards, wait for any admitted install, then
    // replace that one client fiber instead of running two window heartbeats.
    const shared = record;
    const previousMigration = record.migration;
    record.upgrading = record.migration = Promise.resolve(previousMigration).then(async () => {
      while (shared.alive && shared.hold) await new Promise(resolve => setTimeout(resolve, 500));
      if (!shared.alive || !shared.refs.size) return;
      await shared.fiber?.dispose?.();
      if (!shared.refs.size) return;
      shared.alive = true; shared.uiRevision = 11; pools.set(root, shared);
      __stardustUpdatesActivate(shared, pools, root, React, require);
    }).catch(() => { /* The original page remains usable if host disposal fails. */ });
  }
  clearTimeout(record.timer);
  const ref = {}; record.refs.set(ref, participant);
  host.effect(() => () => {
    record.refs.delete(ref);
    const stop = () => {
      if (record.refs.size || !record.alive) return;
      if (record.hold) { record.timer = setTimeout(stop, 1000); return; }
      record.alive = false; Promise.resolve(record.fiber?.dispose?.()).catch(() => {});
    };
    if (!record.refs.size) record.timer = setTimeout(stop, 1000);
  });
}
function __stardustUpdatesActivate(shared, pools, root, React, require) {
  shared.fiber = root.plugin({ name: 'stardustlc-plugin-updates-client', inject: ['slots', 'locale', 'remote', 'remote.pluginManager'], apply(ctx) {
    const client = __stardustUpdatesClient(ctx, React, require, shared);
    ctx.effect(() => () => { shared.alive = false; client.dispose(); if (pools.get(root) === shared) pools.delete(root); });
  } });
  Promise.resolve(shared.fiber).catch(() => { shared.alive = false; if (pools.get(root) === shared) pools.delete(root); });
}
function __stardustUpdatesClient(ctx, React, require, shared) {
  const h = React.createElement, W = createWorkbenchUI(React), route = new URL('api/stardustlc/plugin-updates', document.baseURI);
  const { useState, useEffect, useRef } = React, id = crypto.randomUUID(), listeners = new Set(), pool = __stardustUpdatesGuards(), requests = new Set(), knownRows = new Map();
  let alive = true, registered = false, state = null, lastInteraction = Date.now(), inPoll = false, manualOperation = false;
  const language = () => String(ctx.locale?.getSnapshot?.().active || '').startsWith('en') ? 'en' : 'zh';
  const t = (zh, en) => language() === 'en' ? en : zh;
  const REPOS = { 'dsh-calendar': 'dsh-calendar', 'dsh-cite': 'dsh-cite', 'dsh-code-security': 'dsh-code-security', 'dsh-codex-port': 'dsh-codex-port', 'deepseek-computer-use': 'deepseek-computer-use', 'dsh-dingtalk': 'dsh-dingtalk', '@stardustlc/dsh-docker': 'dsh-docker', '@stardustlc/dsh-dream': 'dsh-dream', 'dsh-email': 'dsh-email', 'dsh-ffmpeg': 'dsh-ffmpeg', 'dsh-flakefinder': 'dsh-flakefinder', 'dsh-hyperframes': 'dsh-hyperframes', 'dsh-minimal-ptc': 'dsh-minimal-ptc', 'dsh-ppt': 'dsh-ppt', 'dsh-remotion': 'dsh-remotion', '@stardustlc/dsh-review': 'dsh-review', 'dsh-rss': 'dsh-rss', 'dsh-slack': 'dsh-slack', 'dsh-sql': 'dsh-sql', '@stardustlc/dsh-suite': 'dsh-suite', 'dsh-voice': 'dsh-voice' };
  const repoUrl = pkg => Object.hasOwn(REPOS, pkg) ? 'https://github.com/STARDUSTLC666/' + REPOS[pkg] : null;
  const preferences = name => state?.preferences.packages[name] || { checkEnabled: true, autoInstall: false, autoScope: 'compatible', deferredUntil: 0, ignoredVersion: null };
  const originalRow = name => state?.rows.find(row => row.name === name);
  const rowFor = name => { const row = originalRow(name); return row?.bundledBy ? originalRow(row.bundledBy) : row; };
  const activeJob = () => ['verifying', 'installing', 'cancelling'].includes(state?.job?.state);
  function notify() { shared.hold = manualOperation || activeJob(); for (const listener of listeners) listener(); for (const listener of pool.viewListeners) listener(); }
  async function api(body = { action: 'state' }) {
    const controller = new AbortController(); requests.add(controller);
    const timeout = setTimeout(() => controller.abort(), body.action === 'check' ? 95000 : 45000);
    try {
      const response = await fetch(route, { method: 'POST', credentials: 'same-origin', cache: 'no-store', signal: controller.signal, headers: { 'content-type': 'application/json', 'x-stardustlc-updates': '1' }, body: JSON.stringify(body) });
      let data; try { data = await response.json(); } catch { throw new Error('service-unavailable'); }
      if (!response.ok || !data.ok) throw new Error(response.status === 403 ? 'owner-required' : data.code || 'service-unavailable');
      return data.value;
    } catch (error) { if (error?.name === 'AbortError') throw new Error('service-unavailable'); throw error; }
    finally { clearTimeout(timeout); requests.delete(controller); }
  }
  function pageState(manual = manualOperation) {
    const values = [...pool.values.values()], nativeForm = __stardustUpdatesNativeFormState(document);
    const dialog = [...document.querySelectorAll('[role="dialog"],dialog[open]')].some(node => node.getClientRects().length && !(manual && (node.closest('.plugin-updates-footer') || node.querySelector('.plugin-updates-footer'))));
    return { action: 'heartbeat', id, dirty: nativeForm.dirty || values.some(value => value.dirty), busy: nativeForm.busy || values.some(value => value.busy) || dialog, idleForMs: Math.min(86400000, Math.max(0, Date.now() - lastInteraction)) };
  }
  const heartbeat = () => api(pageState());
  function interaction() { lastInteraction = Date.now(); if (registered && alive) void heartbeat().catch(() => {}); }
  const guardChanged = () => { if (registered && alive) void heartbeat().catch(() => {}); };
  for (const event of ['pointerdown', 'keydown', 'input']) document.addEventListener(event, interaction, { capture: true, passive: true });
  pool.listeners.add(guardChanged);
  const close = () => { void fetch(route, { method: 'POST', credentials: 'same-origin', keepalive: true, headers: { 'content-type': 'application/json', 'x-stardustlc-updates': '1' }, body: JSON.stringify({ action: 'client-close', id }) }).catch(() => {}); };
  window.addEventListener('pagehide', close);
  async function refresh() { const next = await api(); if (alive) { state = __stardustUpdatesDisplayRows(__stardustUpdatesSuiteRows(next, shared.refs.values()), knownRows); notify(); } return next; }
  const STALE_CHECK_MS = 30 * 60 * 1000, STALE_RETRY_MS = 5 * 60 * 1000, staleChecks = new Map(), staleInFlight = new Set();
  function refreshIfStale(row) {
    if (!alive || !row || row.sourceKind !== 'registry' || row.bundledBy || !row.available || row.updating) return;
    const now = Date.now();
    if (row.checkedAt && now - row.checkedAt <= STALE_CHECK_MS) return;
    if (staleInFlight.has(row.name) || now - (staleChecks.get(row.name) ?? -Infinity) < STALE_RETRY_MS) return;
    staleChecks.set(row.name, now);
    staleInFlight.add(row.name);
    void (async () => {
      try { await api({ action: 'check', name: row.name }); await refresh(); }
      catch { /* Offline or transient errors stay silent and throttled by staleChecks. */ }
      finally { staleInFlight.delete(row.name); }
    })();
  }
  function useSnapshot() {
    const [, render] = useState(0);
    useEffect(() => { const fn = () => render(value => value + 1); listeners.add(fn); const stop = ctx.locale?.subscribe?.(fn); return () => { listeners.delete(fn); stop?.(); }; }, []);
    return state;
  }
  function message(code) {
    return ({
      'page-dirty': t('有未保存的修改。请先保存或放弃修改，再更新。', 'Save or discard unsaved changes before updating.'),
      'page-busy': t('有页面操作或对话框尚未结束，请完成后再试。', 'Finish the active page operation or close its dialog, then retry.'),
      'page-not-ready': t('还有窗口状态未确认，或旧版插件尚未提供状态保护。请刷新相关窗口，必要时先手动更新旧版插件。', 'A window state is unknown or an older plugin lacks state protection. Refresh the affected windows and manually update legacy plugins if needed.'),
      busy: t('DSH 正在执行任务或安装，请等操作结束。', 'DSH is running a task or installation. Wait for it to finish.'),
      'activity-unknown': t('无法确认任务是否空闲，已暂停安装。', 'Installation paused because task activity is unknown.'),
      'restart-required': t('更新服务需要重启后继续。请在方便时手动重启 DSH。', 'The updater needs a restart. Restart DSH manually when convenient.'),
      'operation-unconfirmed': t('上次安装未确认或恢复失败。请在官方插件管理中检查并修复，之后手动重启 DSH。', 'The last installation is unconfirmed or recovery failed. Check and repair it in native plugin management, then restart DSH manually.'),
      'check-first': t('检查结果已过期，请重新检查。', 'This check expired. Check again.'),
      'release-changed': t('发现更新的发布版本（或发布信息已更新），已刷新至最新状态，请再次确认安装。', 'A newer release or updated metadata was found and refreshed; confirm again to install.'),
      'preferences-conflict': t('另一个窗口修改了偏好，已刷新，请重试。', 'Preferences changed in another window. They have been refreshed; retry.'),
      'preferences-unreadable': t('更新偏好文件无法读取，自动安装已关闭。请检查当前 profile 的 stardustlc-plugin-updates.json。', 'Preferences could not be read. Automatic installation is off. Check stardustlc-plugin-updates.json in this profile.'),
      'no-update': t('版本已变化或暂不兼容，请重新检查。', 'The version changed or is incompatible. Check again.'),
      'source-not-registry': t('本地源码、Git 等安装，请通过原安装方式更新。', 'Update local, Git and other external sources through their original installation method.'),
      'managed-by-suite': t('这个插件随 Suite 安装，通过 Suite 更新。', 'This plugin was installed through Suite and is updated through Suite.'),
      'owner-required': t('只有 profile 拥有者能管理更新。', 'Only the profile owner can manage updates.'),
      'version-mismatch': t('宿主装入的版本与目标不同。请重新检查版本和软件源策略。', 'The installed version differs from the target. Check the release and registry policy.'),
      'unexpected-package': t('宿主装入的包或版本与目标不同。请检查版本和软件源策略。', 'The installed package or version differed from the target. Check the release and registry policy.'),
      'version-unconfirmed': t('尚未确认新版已加载，请在插件详情中检查当前版本。', 'The new version could not be confirmed. Check the installed version in plugin details.'),
      'build-blocked': t('构建脚本等待批准。请查看原生插件管理中的安装提示。', 'Build scripts await approval. Review the install details in native plugin management.'),
      'bundle-in-use': t('宿主暂时无法热卸载旧版（通常因本轮刚更新过其他共用底层依赖的插件，内存路径待刷新；或同时启用了包含此组件的组合包）：直接手动重启一次 DSH 即可继续更新，无需逐个停用插件。', 'The host cannot hot-unload the previous version right now (usually because another plugin sharing dependencies was updated earlier in this session, or a bundle containing this component is also active): restart DSH once and retry without disabling plugins one by one.'),
      'already-installed': t('该包已在当前配置中，请刷新或重启 DSH 后查看当前版本。', 'This package is already present in the profile; refresh or restart DSH to inspect its version.'),
      'incompatible-version': t('目标版本与当前运行的 DSH 版本不兼容。', 'The target version is incompatible with the running DSH version.'),
      'stop-profile': t('当前配置未启用热重载，需关闭 DSH 后再通过命令行更新。', 'This profile runs without hot reload; stop DSH and update via CLI.'),
      'not-removable': t('此内置或受保护插件不支持在此处移除替换。', 'This built-in or protected bundle cannot be replaced here.'),
      'pkg-network': t('连接 npm 源时网络中断，请稍后重试。', 'Network error reaching the package registry. Retry shortly.'),
      'pkg-timeout': t('包管理器请求超时，请检查网络后重试。', 'Package manager request timed out. Check your connection and retry.'),
      'pkg-not-found': t('未找到目标版本或已被源撤回，请重新检查更新。', 'Target release was not found on the registry. Check again.'),
      'pkg-no-matching-version': t('没有匹配当前兼容性要求的已发布版本。', 'No published version matches the compatibility constraints.'),
      'pkg-integrity': t('下载包的完整性校验未通过，已放弃安装，请重试。', 'Package integrity verification failed. Installation aborted; retry.'),
      'pkg-disk-full': t('磁盘空间不足，请清理后重试。', 'Disk space is full. Free disk space and retry.'),
      'pkg-permission': t('无权写入当前 profile 目录，请检查文件权限。', 'Permission denied writing to this profile directory.'),
      'pkg-pnpm-missing': t('未检测到可用的 pnpm，请在环境或宿主插件设置中检查。', 'pnpm is unavailable to the host package manager.'),
      'operation-error': t('宿主包管理器未能完成操作，可在原生「插件」详情页点击更新查看完整日志。', 'Host package manager did not complete the operation. Retry from native plugin details to inspect logs.'),
    })[code] || t('操作未完成，请刷新后重试。DSH 不会因此自动重启。', 'The operation could not be completed. Refresh and retry. DSH will not restart automatically.');
  }
  function reasonOf(job) {
    if (!job) return null;
    if (job.reason) return job.reason;
    const res = job.outcome?.result;
    if (res?.pendingBuilds || res?.failureKind === 'build-blocked') return 'build-blocked';
    if (res?.failureKind && ['network', 'timeout', 'not-found', 'no-matching-version', 'integrity', 'pnpm-missing', 'disk-full', 'permission'].includes(res.failureKind)) return 'pkg-' + res.failureKind;
    return res?.error?.code || null;
  }
  // releaseOf() keeps the failing engine/peer range check as a stable code; say which
  // environment has to change instead of only reporting that the release is incompatible.
  function requirement(release) {
    return ({
      'dsh-version': t('需要换成与该版本匹配的 DSH 本体', 'it needs a different DSH version'),
      'node-version': t('需要换成与该版本匹配的 Node.js', 'it needs a different Node.js version'),
      deprecated: t('作者已把这个版本标记为弃用', 'the author marked this release as deprecated'),
      'not-bundle': t('这个版本不是可加载的 DSH 插件包', 'this release is not a loadable DSH plugin bundle'),
    })[release?.reason] || t('发布元数据的兼容范围与当前环境不符', 'its published compatibility range does not match this environment');
  }
  function jobLabel(job) {
    if (job.state === 'installing') {
      const phase = ({
        checking: t('宿主正在检查版本', 'Host checking release'),
        removing: t('正在卸载旧版', 'Unloading the previous version'),
        applying: t('正在加载新版', 'Loading the new version'),
        restoring: t('正在恢复旧版', 'Restoring the previous version'),
      })[job.phase];
      if (phase) return phase;
    }
    return ({ verifying: t('正在核对版本', 'Verifying release'), installing: t('正在安装', 'Installing'), cancelling: t('正在请求取消', 'Requesting cancellation'), complete: t('已更新', 'Updated'), 'restart-required': t('已安装，等待你手动重启', 'Installed; manual restart needed'), restored: t('更新未成功，已恢复原版本', 'Update failed; previous version restored'), 'restore-failed': t('恢复未成功，请检查官方插件管理', 'Recovery failed; check native plugin management'), unknown: t('结果未确认，请检查官方插件管理', 'Result unconfirmed; check native plugin management'), cancelled: t('已取消', 'Cancelled'), failed: t('更新未成功', 'Update failed') })[job.state] || job.state;
  }
  const FOOTER_CSS = '.plugin-updates-footer{box-sizing:border-box;flex-shrink:0;margin-top:16px;padding-top:14px;border-top:var(--dsh-control-border-width,0.5px) solid var(--dsw-alias-border-l2,var(--dsw-alias-border-l3,#e5e7eb));min-width:0;max-width:100%;color:var(--dsw-alias-label-primary,#202124)}'
    + '.dshw.plugin-updates-footer.is-inline{display:block!important;width:100%!important;max-width:100%!important;margin-block:auto 0!important;margin-inline:0!important;padding:6px 14px!important;border-top:var(--dsh-control-border-width,0.5px) solid var(--dsw-alias-border-l2,var(--dsw-alias-border-l3,#e5e7eb));background:var(--dsw-alias-bg-layer-1,var(--w-soft,#f7f8fa));font-size:12px;line-height:1.45}'
    + '.plugin-updates-footer .updates-bar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px 12px;min-block-size:28px;min-width:0}'
    + '.plugin-updates-footer .updates-bar-info,.plugin-updates-footer .updates-bar-actions,.plugin-updates-footer .updates-head-actions,.plugin-updates-footer .updates-title-row{display:flex;align-items:center;flex-wrap:wrap;gap:6px 8px;min-width:0}'
    + '.plugin-updates-footer .updates-head{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px 12px}'
    + '.plugin-updates-footer .updates-compact-bar{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px 12px}'
    + '.plugin-updates-footer .updates-compact-bar>.updates-options{margin-top:0;min-width:0}'
    + '.plugin-updates-footer .updates-compact-bar>.updates-options[open]{flex:1 1 100%}'
    + '.plugin-updates-footer h2{font-size:13.5px;line-height:1.4;margin:0;font-weight:600}'
    + '.plugin-updates-footer .updates-pill{display:inline-flex;align-items:center;padding:1px 7px;border-radius:999px;font-size:11px;font-weight:600;line-height:1.5;background:var(--dsw-alias-bg-layer-2,var(--w-soft,#eef1f6));color:var(--dsw-alias-label-secondary,#657080)}'
    + '.plugin-updates-footer .updates-pill.is-accent{background:color-mix(in srgb,var(--w-accent,#4f6bdb) 14%,transparent);color:var(--w-accent,#4f6bdb)}'
    + '.plugin-updates-footer .updates-pill.is-error{background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#ad3636) 14%,transparent);color:var(--dsw-alias-state-error-primary,#ad3636)}'
    + '.plugin-updates-footer .updates-mono,.plugin-updates-footer .updates-subtitle,.plugin-updates-footer .updates-version{font:12px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;overflow-wrap:anywhere;margin:0}'
    + '.plugin-updates-footer .updates-badge{padding:1px 6px;border-radius:5px;background:var(--dsw-alias-bg-layer-2,var(--w-soft,#eef1f6));color:var(--dsw-alias-label-secondary,#657080)}'
    + '.plugin-updates-footer .updates-meta-line,.plugin-updates-footer .updates-note{margin:3px 0 0;font-size:12px;line-height:1.55}'
    + '.plugin-updates-footer .updates-inline-msg.is-error{color:var(--dsw-alias-state-error-primary,#ad3636);font-size:12px}'
    + '.plugin-updates-footer .w-button.is-sm{min-block-size:26px;min-inline-size:26px;min-height:26px;padding:3px 9px;font-size:12px;gap:5px;border-radius:6px}'
    + '.plugin-updates-footer .updates-options{margin-top:8px}'
    + '.plugin-updates-footer .updates-options>summary{cursor:pointer;display:inline-flex;align-items:center;gap:0.55ch;min-block-size:24px;font-size:12px;line-height:1.5;font-weight:500;color:var(--dsw-alias-label-secondary,#657080);list-style:none}'
    + '.plugin-updates-footer .updates-options>summary:after{display:none}'
    + '.plugin-updates-footer .updates-options>summary::before{content:"";inline-size:6px;block-size:6px;flex-shrink:0;border-inline-end:1.5px solid currentColor;border-block-end:1.5px solid currentColor;rotate:-45deg}'
    + '.plugin-updates-footer .updates-options>summary:dir(rtl)::before{rotate:135deg}'
    + '.plugin-updates-footer .updates-options[open]>summary::before{rotate:45deg}'
    + '.plugin-updates-footer .updates-options>summary:focus-visible{outline:2px solid var(--dsw-focus-ring-color,#6b79df);outline-offset:3px;border-radius:4px}'
    + '.plugin-updates-footer details::details-content{interpolate-size:allow-keywords;overflow:clip;contain:layout}'
    + '.plugin-updates-footer details:not([open])::details-content{block-size:0}'
    + '.plugin-updates-footer .updates-settings{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:14px;padding:10px 0 2px}'
    + '.plugin-updates-footer>.w-section{margin:8px 0 0;padding:0;border:0}'
    + '.plugin-updates-footer .w-toolbar{margin-top:8px!important}'
    + '.plugin-updates-footer .w-switch-label{max-width:100%;gap:12px;align-items:flex-start}'
    + '.plugin-updates-footer .w-switch-track{flex-shrink:0}'
    + '.plugin-updates-footer .updates-notes{margin-top:8px;padding:10px 12px;border:1px solid var(--dsw-alias-border-l3,#e5e7eb);border-radius:8px;background:var(--dsw-alias-bg-base,var(--w-bg,#fff))}'
    + '.plugin-updates-footer .updates-notes pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:220px;overflow:auto;margin:6px 0;padding:10px;font:12px/1.65 ui-monospace,monospace}'
    + '.plugin-updates-footer .updates-notes pre code{font:inherit;background:transparent;padding:0}'
    + '.plugin-updates-footer .updates-links{display:flex;flex-wrap:wrap;align-items:center;gap:4px 14px;margin-top:10px;padding-top:8px;border-top:1px dashed var(--dsw-alias-border-l3,#e5e7eb);font-size:12px;line-height:1.5;color:var(--dsw-alias-label-secondary,#657080)}'
    + '.plugin-updates-footer .updates-links a{color:inherit;text-decoration:none;display:inline-flex;align-items:center;min-block-size:24px;gap:4px}'
    + '.plugin-updates-footer .updates-links a:hover{color:var(--dsw-alias-label-primary,#202124);text-decoration:underline}'
    + '.plugin-updates-footer .updates-links a:focus-visible{outline:2px solid var(--dsw-focus-ring-color,#6b79df);outline-offset:3px;border-radius:4px}'
    + '.plugin-updates-footer .w-overlay{z-index:1002}'
    + '.plugin-updates-footer .updates-auto-nudge{display:flex;align-items:center;flex-wrap:wrap;gap:6px 10px;margin-top:6px;font-size:12px;color:var(--dsw-alias-label-secondary,#657080)}'
    + '@media(pointer:coarse){.plugin-updates-footer .w-button.is-sm{min-block-size:32px;min-height:32px;padding:5px 11px}}'
    + '@media(prefers-reduced-motion:no-preference){.plugin-updates-footer .updates-options>summary::before{transition:rotate .18s ease}.plugin-updates-footer details::details-content{transition:block-size .22s ease,content-visibility .22s ease allow-discrete}}'
    + '@media(max-width:600px){.plugin-updates-footer .updates-head{gap:8px}.plugin-updates-footer .w-toolbar{gap:6px;flex-wrap:wrap}.plugin-updates-footer .w-button{max-width:100%}}';
  function FooterFrame({ name, label, inline = false, supplement = false, head, children }) {
    return h('section', { className: 'dshw plugin-updates-footer' + (inline ? ' is-inline' : ''), 'data-plugin-update-footer': name, 'aria-label': label + (supplement ? t(' · 自动更新与反馈', ' · Auto-update and feedback') : t(' · 版本与更新', ' · Version and updates')) },
      h('style', null, W.styles),
      h('style', null, FOOTER_CSS),
      head, children);
  }
  function Panel({ name, inline = false }) {
    const snapshot = useSnapshot(), [error, setError] = useState(''), [working, setWorking] = useState(false), [checking, setChecking] = useState(false), [dialog, setDialog] = useState(null), [selectedVersion, setSelectedVersion] = useState(null), [notes, setNotes] = useState(null), [notesOpen, setNotesOpen] = useState(false), [loadingNotes, setLoadingNotes] = useState(false), [dismissedJobId, setDismissedJobId] = useState(null);
    const seenActiveJob = useRef ? useRef(null) : { current: null };
    const row = rowFor(name), original = originalRow(name), target = row?.name || name, prefs = preferences(target), job = snapshot?.job?.name === target ? snapshot.job : null;
    if (job && ['verifying', 'installing', 'cancelling'].includes(job.state)) seenActiveJob.current = job.id;
    const panelStaleTarget = !!snapshot && !!row && !!original && (!inline || (row.sourceKind === 'registry' && row.available && prefs.deferredUntil <= Date.now() && prefs.ignoredVersion !== row.release?.version));
    useEffect(() => { if (panelStaleTarget && !activeJob()) refreshIfStale(row); }, [panelStaleTarget, row?.name, row?.available, row?.checkedAt]);
    async function perform(callback) { setError(''); setWorking(true); try { await callback(); await refresh(); } catch (error) { setError(error.message); await refresh().catch(() => {}); } finally { setWorking(false); } }
    async function save(changes, consent) { await api({ action: 'preferences', name: target, revision: state.preferences.revision, changes, consent }); }
    async function check() { setError(''); setChecking(true); try { staleChecks.set(target, Date.now()); await api({ action: 'check', name: target }); await refresh(); } catch (error) { setError(error.message); } finally { setChecking(false); } }
    async function runOperation(request) {
      setDialog(null); manualOperation = true; notify();
      setError(''); setWorking(true);
      try {
        try {
          await heartbeat();
          const started = await api(request);
          seenActiveJob.current = started.id;
          while (alive) {
            await new Promise(resolve => setTimeout(resolve, 800)); await heartbeat(); await refresh();
            if (state.job?.id !== started.id) throw new Error('operation-unconfirmed');
            if (!activeJob()) break;
          }
          await refresh();
        } finally { manualOperation = false; notify(); }
      } catch (err) {
        setError(err.message);
        if (request.action === 'install' && ['check-first', 'release-changed'].includes(err?.message)) {
          staleChecks.set(target, Date.now());
          await api({ action: 'check', name: target }).catch(() => {});
        }
        await refresh().catch(() => {});
      } finally { setWorking(false); }
    }
    async function showNotes() {
      if (notesOpen) { setNotesOpen(false); return; }
      setNotesOpen(true); setNotes(null); setLoadingNotes(true); setError('');
      try { setNotes(await api({ action: 'notes', name: target, version: row.release.version })); } catch (error) { setError(error.message); } finally { setLoadingNotes(false); }
    }
    if (inline && (!snapshot || !row || !original)) return null;
    if (!snapshot) return h('p', { className: 'dshw w-muted' }, t('正在读取更新状态…', 'Loading update status…'));
    if (!row || !original) return h(W.Status, null, t('此插件尚未安装或已从当前 profile 移除。', 'This plugin is not installed in the current profile.'));
    const title = language() === 'en' ? original.labelEn : original.label;
    const ownPage = pageState(true), unconfirmed = ['unknown', 'restore-failed'].includes(snapshot.job?.state);
    const staleWindows = (snapshot.pages.clients || []).some(client => !client.fresh);
    const pageBusy = ownPage.busy || (snapshot.pages.clients || []).some(client => client.id !== id && client.busy);
    const installLocked = working || activeJob() || unconfirmed || snapshot.updaterRestart || snapshot.preferenceError || !snapshot.activity.known
      || snapshot.activity.busy || snapshot.pages.dirty || ownPage.dirty || pageBusy || !snapshot.pages.known;
    const checkingThis = checking || snapshot.checkingNames?.includes(target);
    const managed = row.sourceKind === 'registry';
    const showUpdate = managed && row.available;
    const deferred = prefs.deferredUntil > Date.now();
    const ignored = !!row.release?.version && prefs.ignoredVersion === row.release.version;
    const actionableUpdate = showUpdate && !deferred && !ignored;
    const canConfirm = showUpdate && row.release?.version === selectedVersion && !installLocked && !row.loadError;
    const isSuite = target === '@stardustlc/dsh-suite';
    const jobResult = job?.outcome?.result;
    const jobReason = reasonOf(job);
    const jobActiveThis = !!job && ['verifying', 'installing', 'cancelling'].includes(job.state);
    const canCancel = jobActiveThis && !['applying', 'restoring'].includes(job.phase);
    const jobAttentionThis = !!job && ['restart-required', 'restored', 'restore-failed', 'unknown', 'failed'].includes(job.state) && (unconfirmed || dismissedJobId !== job.id);
    const jobJustCompleted = !!job && job.state === 'complete' && seenActiveJob.current === job.id && dismissedJobId !== job.id;
    const canSuggestAuto = !!job && job.state === 'complete' && !jobReason && job.mode !== 'automatic' && (!prefs.autoInstall || prefs.autoScope !== 'compatible') && managed && !snapshot.preferenceError && dismissedJobId !== job.id;
    const inlineJobVisible = jobActiveThis || jobAttentionThis || jobJustCompleted;
    if (inline && !actionableUpdate && !inlineJobVisible && !working && !checking && !error && !dialog && !notesOpen) return null;
    const notesSection = notesOpen && h('section', { className: 'updates-notes', 'aria-label': t('更新记录', 'Release notes') },
      h('strong', null, target + ' · ' + (notes?.version || row.release?.version || '')),
      loadingNotes ? h('p', { className: 'w-muted updates-note' }, t('正在读取…', 'Loading…'))
        : notes?.text ? h('pre', { tabIndex: 0, role: 'region', 'aria-label': t('更新记录内容', 'Release notes content') }, h('code', null, notes.text))
        : h('p', { className: 'w-muted updates-note' }, t('未找到此版本的独立更新记录。', 'No separate notes were found for this version.')),
      notes?.url && h('a', { href: notes.url, target: '_blank', rel: 'noreferrer noopener' }, t('查看仓库更新记录', 'View repository changelog')));
    const windowsDialog = dialog === 'windows' && h(W.Dialog, { title: t('断开的窗口都已关闭？', 'Are the disconnected windows closed?'), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
      h('div', { className: 'w-stack' }, h('p', null, t('只清除超过 45 秒未回应的其他窗口记录。请先确认它们已经关闭；仍在使用的窗口请保存修改并刷新。当前或仍在回应的窗口保护会保留。', 'Only other windows silent for over 45 seconds are cleared. Confirm that they are closed; save and refresh windows still in use. Current and responsive windows remain protected.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')), h(W.Button, { onClick: () => { setDialog(null); void perform(() => api({ ...pageState(true), action: 'reconfirm-windows', confirmation: 'other-stale-windows-are-closed' })); } }, t('已关闭，重新确认状态', 'They are closed; reconfirm')))));
    const confirmDialog = ['automatic', 'install'].includes(dialog) && h(W.Dialog, { title: dialog === 'automatic' ? (isSuite ? t('允许 Suite 空闲时自动热更新？', 'Allow idle automatic updates for Suite?') : t('允许这个插件空闲时自动热更新？', 'Allow idle automatic updates for this plugin?')) : (isSuite ? t('确认更新 Suite 整包', 'Confirm Suite bundle update') : t('确认更新此插件', 'Confirm this plugin update')), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
      dialog === 'automatic' ? h('div', { className: 'w-stack' }, h('p', null, (language() === 'en' ? row.labelEn : row.label) + ' · ' + target), isSuite && h('p', null, t('此处设置作用于 Suite 整包（包含 18 个组件）。独立安装的其他插件不受影响。', 'This setting applies to the whole Suite (including its 18 components). Other independently installed plugins are unaffected.')), h('p', null, t('你正在主动启用自动安装。只处理通过当前 DSH 与 Node 兼容性校验的稳定版本（含功能小版本与补丁，跨主版本仍需手动确认）；有任务、未保存修改、未知窗口或等待重启时暂停。', 'You are explicitly enabling automatic installation for compatible stable releases (minor and patch updates matching this DSH and Node runtime; major upgrades still require manual confirmation). Running tasks, unsaved changes, unknown windows or a pending restart pause it.')), h('p', null, t('支持热更新时原地重载，不会自动重启 DSH；其他插件不会跟着开启，可随时关闭。', 'Hot-reloads in place when supported and never restarts DSH automatically. Other plugins remain unchanged; turn it off anytime.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('保持关闭', 'Keep off')), h(W.Button, { variant: 'primary', onClick: () => { setDialog(null); void perform(() => save({ checkEnabled: true, autoInstall: true, autoScope: 'compatible' }, 'enable-idle-compatible-updates')); } }, t('允许空闲自动热更新', 'Allow idle automatic updates')))) :
      h('div', { className: 'w-stack' },
        isSuite && h('p', null, t('此处操作的是 Suite 整包，包含 18 个组件。独立安装的其他插件不受影响。', 'This action applies to the whole Suite, including its 18 components. Other independently installed plugins are unaffected.')),
        h('p', { className: 'updates-version' }, target + ' · ' + row.version + ' → ' + selectedVersion),
        h('p', null, selectedVersion === row.release?.version ? t('Harness 会热更新并重新加载；需要手动重启时，更新区会显示宿主结果，停用状态会保留。', 'Harness hot-updates and reloads in place. If a manual restart is needed, it appears in the update result; disabled status is preserved.') : (showUpdate && row.release?.version ? message('release-changed') : message('check-first'))),
        h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')),
          showUpdate && row.release?.version && row.release.version !== selectedVersion
            ? h(W.Button, { variant: 'primary', disabled: installLocked || row.loadError, onClick: () => { setError(''); setSelectedVersion(row.release.version); } }, t('更新为 v', 'Use v') + row.release.version)
            : h(W.Button, { variant: 'primary', disabled: !canConfirm, onClick: () => runOperation({ action: 'install', name: target, version: selectedVersion, confirmation: 'update-installed-plugin' }) }, t('安装此版本', 'Install this version')))));
    const checkButton = variant => h(W.Button, { variant, className: 'is-sm', icon: 'refresh', disabled: checkingThis || !managed, onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : isSuite ? t('检查整包更新', 'Check Suite updates') : t('检查更新', 'Check for updates'));
    const recheckButton = variant => h(W.Button, { variant, className: 'is-sm', icon: 'refresh', disabled: checkingThis || !managed, onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : t('重新检查', 'Check again'));
    const primary = showUpdate
      ? h(W.Button, { variant: 'primary', className: 'is-sm', icon: 'download', disabled: installLocked || row.loadError, onClick: () => { setError(''); if (job && !jobActiveThis && !unconfirmed) setDismissedJobId(job.id); setSelectedVersion(row.release.version); setDialog('install'); } }, (isSuite ? t('更新 Suite 至 v', 'Update Suite to v') : t('更新至 v', 'Update to v')) + row.release.version)
      : managed ? checkButton() : null;
    if (inline) {
      const lockHint = unconfirmed ? message('operation-unconfirmed')
        : snapshot.updaterRestart ? message('restart-required')
        : snapshot.preferenceError ? message('preferences-unreadable')
        : (snapshot.pages.dirty || ownPage.dirty) ? t('请先保存修改后再更新', 'Save changes before updating')
        : (snapshot.activity.busy || pageBusy) ? t('当前任务或对话框结束后可更新', 'Finish active task or dialog to update')
        : (!snapshot.activity.known || !snapshot.pages.known) ? t('等待窗口状态确认', 'Waiting for window confirmation')
        : '';
      return h(FooterFrame, { name, label: title, inline: true, head: h('div', { className: 'updates-bar' },
        h('div', { className: 'updates-bar-info' },
          inlineJobVisible
            ? h(React.Fragment, null,
              h('span', { className: 'updates-pill' + (jobActiveThis ? ' is-accent' : ['failed', 'restore-failed', 'unknown', 'restored'].includes(job.state) ? ' is-error' : '') }, jobLabel(job)),
              job.to && h('span', { className: 'updates-mono' }, (isSuite ? 'dsh-suite ' : '') + job.from + ' → ' + job.to),
              jobReason && h('span', { className: 'updates-inline-msg is-error' }, message(jobReason)))
            : actionableUpdate ? h(React.Fragment, null,
              h('span', { className: 'updates-pill is-accent' }, isSuite ? t('Suite 新版本', 'Suite update') : t('有新版本', 'Update available')),
              h('span', { className: 'updates-mono' }, (isSuite ? 'dsh-suite ' : '') + 'v' + row.version + ' → v' + row.release.version),
              lockHint && h('span', { className: 'w-muted' }, '· ' + lockHint)) : null,
          error && h('span', { className: 'updates-inline-msg is-error', role: 'alert' }, message(error))),
        h('div', { className: 'updates-bar-actions' },
          staleWindows && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => setDialog('windows') }, t('确认已关闭窗口', 'Confirm closed windows')),
          canCancel && h(W.Button, { className: 'is-sm', disabled: job?.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update')),
          !jobActiveThis && error === 'check-first' && managed && recheckButton(actionableUpdate ? 'ghost' : 'primary'),
          !jobActiveThis && actionableUpdate && row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
          !jobActiveThis && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')),
          !jobActiveThis && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版', 'Ignore')),
          !jobActiveThis && actionableUpdate && primary,
          !jobActiveThis && !actionableUpdate && canSuggestAuto && h(W.Button, { variant: 'primary', className: 'is-sm', disabled: working, onClick: () => { setError(''); setDialog('automatic'); } }, t('开启空闲自动热更新', 'Enable idle auto-updates')),
          !jobActiveThis && !actionableUpdate && !unconfirmed && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => { setError(''); setNotesOpen(false); if (job) setDismissedJobId(job.id); } }, t('关闭', 'Dismiss')))) },
        notesSection, windowsDialog, confirmDialog);
    }
    function progress() {
      if (!job || (!jobActiveThis && !unconfirmed && dismissedJobId === job.id)) return null;
      if (job.state === 'complete' && !jobReason) {
        return job.to ? h('div', null,
          h('p', { className: 'w-muted updates-note' }, '✓ ' + jobLabel(job) + ' · ' + job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动更新', ' · Automatic update') : '')),
          canSuggestAuto && h('div', { className: 'updates-auto-nudge' },
            h('span', null, t('以后有兼容新版本时，需要空闲自动热更新吗？', 'Auto-install future compatible updates while idle?')),
            h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => { setError(''); setDialog('automatic'); } }, t('开启空闲自动热更新', 'Enable idle auto-updates')),
            h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => setDismissedJobId(job.id) }, t('关闭', 'Dismiss')))) : null;
      }
      return h('section', { className: 'w-section', role: 'status', 'aria-label': t('更新进度', 'Update progress') },
        h('h3', null, jobLabel(job)),
        job.to && h('p', { className: 'w-muted' }, job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动更新', ' · Automatic update') : '')),
        job.state === 'restart-required' && jobResult?.restartReason === 'package-moved' && h('p', { className: 'w-muted updates-note' }, t('新版已就绪；因多个独立插件共用底层依赖，请先手动重启一次 DSH 生效后再继续更新其他插件。', 'Installed; because standalone plugins share dependencies, restart DSH once before updating additional plugins.')),
        jobReason && h(W.Status, { tone: 'error' }, message(jobReason)),
        h('div', { className: 'updates-bar-actions', style: { marginTop: '6px' } },
          canCancel && h(W.Button, { className: 'is-sm', disabled: job.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update')),
          !jobActiveThis && !unconfirmed && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => setDismissedJobId(job.id) }, t('关闭提示', 'Dismiss'))));
    }
    function windowControls() {
      if (!staleWindows) return null;
      return h(W.Status, null, h('p', null, t('有窗口已断开，无法确认是否还有未保存修改。仍在使用的窗口请先保存并刷新；已关闭的窗口可以手动重新确认。', 'A disconnected window may contain unsaved changes. Save and refresh windows still in use. If they are closed, you can confirm that manually.')), h(W.Button, { className: 'is-sm', onClick: () => setDialog('windows') }, t('重新确认已关闭的窗口', 'Confirm closed windows')));
    }
    const incompatibleText = row.release && !row.release.compatible ? t('新版本暂不兼容当前环境：', 'Latest release is incompatible with this environment: ') + requirement(row.release) + (row.release.required ? ' (' + row.release.required + ')' : '') : '';
    const optionsSection = h('details', { className: 'updates-options' },
      h('summary', null, !original.bundledBy ? t('自动更新与提醒', 'Auto-update & reminders') : t('更新选项', 'Update options'), ' · ', prefs.checkEnabled ? t('自动检查：开', 'Checks: on') : t('自动检查：关', 'Checks: off'), ' · ', prefs.autoInstall ? (prefs.autoScope === 'compatible' ? t('空闲自动热更新：兼容版', 'Idle auto-update: compatible') : t('空闲自动热更新：仅补丁', 'Idle auto-update: patches')) : t('空闲自动热更新：关', 'Idle auto-update: off')),
      h('section', { className: 'updates-settings', 'aria-label': t('这个插件的更新偏好', 'Update preferences for this plugin') },
        h('div', null, h(W.Switch, { label: isSuite ? t('自动检查 Suite 整包更新', 'Automatically check Suite updates') : t('自动检查这个插件的更新', 'Automatically check this plugin'), checked: prefs.checkEnabled, disabled: working || !!snapshot.preferenceError || !managed, onChange: event => perform(() => save({ checkEnabled: event.target.checked })) }), h('p', { className: 'w-muted updates-note' }, t('默认开启，每 6 小时最多一次。只影响这个安装包，关闭后仍可手动检查。', 'On by default, at most every 6 hours. This affects only this bundle; manual checks remain available.'))),
        h('div', null, h(W.Switch, { label: isSuite ? t('空闲时自动热更新 Suite 兼容版本', 'Auto-install compatible Suite updates while idle') : t('空闲时自动热更新兼容版本', 'Auto-install compatible updates while idle'), checked: prefs.autoInstall, disabled: working || !!snapshot.preferenceError || !managed, onChange: event => event.target.checked ? (setError(''), setDialog('automatic')) : perform(() => save({ autoInstall: false })) }), h('p', { className: 'w-muted updates-note' }, t('默认关闭。明确开启后，仅在空闲且无未保存修改时热更新兼容稳定版（含功能小版本与补丁，不含跨主版本）。其他插件的开关不变。', 'Off by default. Explicitly enable compatible stable updates (minor and patch, excluding major) while idle with no unsaved changes. Other plugins’ settings stay unchanged.')), prefs.autoInstall && prefs.autoScope !== 'compatible' && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => { setError(''); setDialog('automatic'); } }, t('升级为包含兼容功能小版本', 'Include compatible minor updates')))));
    const errorStatus = error && h(W.Status, { tone: 'error' }, error === 'check-first' && managed ? h('div', { className: 'updates-bar-actions' }, h('span', null, message(error)), recheckButton('ghost')) : message(error));
    const linksNav = (() => {
      const ownRepo = repoUrl(original.name), suiteRepo = repoUrl('@stardustlc/dsh-suite'), starRepo = isSuite ? suiteRepo : ownRepo;
      if (!ownRepo && !starRepo) return null;
      return h('nav', { className: 'updates-links', 'aria-label': t('开源仓库与反馈', 'Repository and feedback') },
        starRepo && h('a', { href: starRepo, target: '_blank', rel: 'noreferrer noopener' }, isSuite ? t('★ 觉得好用？在 GitHub 给 dsh-suite 点个 Star', '★ Useful? Star dsh-suite on GitHub') : t('★ 觉得好用？在 GitHub 点个 Star', '★ Useful? Star on GitHub')),
        ownRepo && h('a', { href: ownRepo + '/issues', target: '_blank', rel: 'noreferrer noopener' }, t('提交建议 / 问题反馈', 'Feedback & issues')),
        isSuite && original.name !== '@stardustlc/dsh-suite' && ownRepo && h('a', { href: ownRepo, target: '_blank', rel: 'noreferrer noopener' }, t('组件仓库', 'Component repo')),
        !isSuite && suiteRepo && h('a', { href: suiteRepo, target: '_blank', rel: 'noreferrer noopener' }, t('了解 dsh-suite（18 合 1 组合包）', 'Explore dsh-suite (18-in-1 bundle)')));
    })();
    if (!original.bundledBy) {
      // Native bundle detail pages in DSH already render their own Version & Source sections
      // ("重新检查", version list & "更新" button). Keep only non-duplicative auto-update preferences,
      // inline changelog notes, compatibility/error diagnostics, and GitHub feedback links here.
      return h(FooterFrame, { name, label: title, supplement: true, head: h('div', { className: 'updates-compact-bar' },
        optionsSection,
        (row.release || (showUpdate && (!deferred || !ignored))) && h('div', { className: 'updates-head-actions' },
          row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
          showUpdate && !deferred && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('推迟提醒 24h', 'Snooze 24h')),
          showUpdate && !ignored && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版提醒', 'Mute reminder')))) },
        notesSection,
        incompatibleText && h(W.Status, null, incompatibleText),
        errorStatus, snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
        snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有插件更新等待手动重启后生效；空闲自动热更新已暂停，建议先重启一次 DSH 再继续更新其他共用依赖的插件。', 'An update awaits a manual restart; idle auto-updates are paused. Restart DSH once before updating other plugins that share dependencies.')),
        prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
        (prefs.autoInstall || jobActiveThis) && windowControls(),
        jobActiveThis && (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')),
        jobActiveThis && (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
        deferred && h('p', { className: 'w-muted updates-note' }, t('已推迟此插件的工作台更新提示 24 小时。', 'Workbench update notices for this plugin are snoozed for 24 hours.')),
        unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
        progress(),
        linksNav,
        windowsDialog, confirmDialog
      );
    }
    const status = !managed ? t('本地 / 外部来源，保留原安装方式', 'Local / external source; keep original install method') : row.loadError ? t('加载异常，请先检查原生插件管理', 'Loading error; check native plugin management') : row.error ? t('检查失败，可以重试', 'Check failed; retry available') : incompatibleText || (row.available ? (ignored ? t('已忽略提醒，仍可手动更新', 'Reminder ignored; manual update available') : t('有兼容的新版本', 'Compatible update available')) : row.checkedAt ? t('当前已是最新稳定版', 'Latest stable version') : t('尚未检查', 'Not checked yet'));
    return h(FooterFrame, { name, label: title, head: h('div', { className: 'updates-head' },
      h('div', null,
        h('div', { className: 'updates-title-row' }, h('h2', null, t('随 Suite 整包管理', 'Managed via Suite bundle')), h('span', { className: 'updates-mono updates-badge' }, original.name + ' · v' + original.version)),
        h('p', { className: 'w-muted updates-meta-line' }, status, row.checkedAt ? ' · ' + t('上次检查：', 'Last checked: ') + new Date(row.checkedAt).toLocaleString(language() === 'en' ? 'en-US' : 'zh-CN') : ''),
        h('p', { className: 'updates-version updates-note' }, target + ' · v' + row.version, row.release?.version && row.release.version !== row.version ? ' → v' + row.release.version : '')),
      h('div', { className: 'updates-head-actions' },
        showUpdate && checkButton('ghost'),
        row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
        showUpdate && !deferred && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')),
        showUpdate && !ignored && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版本提醒', 'Ignore this reminder')),
        primary)) },
      notesSection,
      optionsSection,
      errorStatus, snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
      snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有插件更新等待手动重启后生效；空闲自动热更新已暂停。', 'An update awaits a manual restart; idle auto-updates are paused.')),
      prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
      windowControls(),
      (showUpdate || jobActiveThis) && (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')),
      (showUpdate || jobActiveThis) && (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
      deferred && h(W.Status, null, t('已推迟 Suite 提醒和自动安装 24 小时，仍可手动更新。', 'Suite reminders and automatic installation are deferred for 24 hours. Manual updates remain available.')),
      unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
      progress(),
      linksNav,
      windowsDialog, confirmDialog
    );
  }
  function InlineFooter({ name }) { return h(Panel, { name, inline: true }); }
  function NativeFooter({ subject }) {
    const snapshot = useSnapshot(), name = __stardustUpdatesDetailName(subject, snapshot?.rows || []);
    return name ? h(Panel, { name, inline: false }) : null;
  }
  function register() {
    if (!alive) return;
    if (!registered) {
      registered = true; pool.clients.add(client);
      ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({ name: 'plugins.detail.section', id: 'stardustlc.plugin-update-footer', order: 1000 }, NativeFooter));
      notify();
    }
  }
  async function poll() {
    if (inPoll || !alive || !shared.refs.size) return;
    inPoll = true;
    try { await refresh(); register(); await heartbeat(); }
    catch { /* Owner-only controls stay absent for guests and unsupported hosts. */ }
    finally { inPoll = false; }
  }
  const timer = setInterval(() => { void poll(); }, 15000), first = setTimeout(() => { void poll(); }, 100);
  const client = { t, Footer: InlineFooter, NativeFooter, Button: W.Button, open(name) { const footer = [...document.querySelectorAll('[data-plugin-update-footer]')].find(node => node.getAttribute('data-plugin-update-footer') === name); if (!footer) return false; footer.scrollIntoView({ block: 'end', behavior: 'smooth' }); return true; }, has: name => registered && !!originalRow(name), row: rowFor, dispose() {
    close(); alive = false; clearTimeout(first); clearInterval(timer); pool.clients.delete(client);
    pool.listeners.delete(guardChanged); listeners.clear();
    for (const event of ['pointerdown', 'keydown', 'input']) document.removeEventListener(event, interaction, true);
    window.removeEventListener('pagehide', close);
    for (const controller of requests) controller.abort();
    for (const listener of pool.viewListeners) listener();
  } };
  return client;
}

/* STARDUSTLC_UPDATE_CLIENT_BODY_START */
window.__ModuleLoader__.load(__stardustUpdatesWrap({id:"@stardustlc/dsh-docker",factory:require=>({apply(){}})},{"name":"@stardustlc/dsh-docker","version":"0.1.0","hasWorkbench":false,"packageVersion":"0.5.24","label":"Docker","labelEn":"Docker","suiteComponent":true,"sectionIds":[],"iconData":"data:image/webp;base64,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"}));

/* STARDUSTLC_UPDATE_CLIENT_BODY_END */
})();
