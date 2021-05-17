<script>
  import porter from "/src/assets/porter.png"
  import {title, subTitle, user} from "../stores.js"
</script>

<div class="uk-width-2-3@m  uk-card uk-card-default uk-padding-small uk-visible@m" style="background-color: #877EB4">
  <div class="uk-grid" style="color: black">
    <div class="uk-width-1-6@m">
      <a href="/"> <img src="{porter}" width="60" alt="img"/> </a>
    </div>
    <div class="uk-width-expand@m uk-text-left" style="background-color: #877EB4; color: black">
      <div class="title">
        {$title}
      </div>
      <div class="uk-text-muted uk-text-small">
        {$subTitle}
      </div>
    </div>
    <div class="uk-card uk-card-small uk-text-center uk-padding-remove">
      <a target="_blank" href="https://github.com/wit-hdip-comp-sci-2020/donation-svelte">
        <div>
          <i class="fab fa-github fa-3x" style="color:#653DC2" title="Source repo" pos="bottom" uk-tooltip></i>
        </div>
        <div class="uk-width-expand@m uk-text-left">
          <div class="uk-text-muted uk-text-center" style="font-size:xx-small">{$user.email}</div>
        </div>
      </a>
    </div>
  </div>
</div>
